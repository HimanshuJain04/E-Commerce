const User = require("../models/user");
const Product = require("../models/product");
const Category = require("../models/category");
const Tag = require("../models/tag");
const { uploadMultipleFile } = require("../utils/uploadFileToCloudinary");
require('dotenv').config();



exports.createProduct = async (req, res) => {
    try {

        // fetch the data from request
        const { name, price, stock, details, description, category, tag } = req.body;

        const images = req?.files?.images;

        // validation
        if (!name || !price || !description || !details || !images || !stock || !category || !tag) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields Required",
                    error: "All Fields Required",
                }
            )
        }

        // check tag is already exist or not
        const existTag = await Tag.findOne(
            {
                name: tag
            }
        );

        // check category is already exist or not
        const existCategory = await Category.findOne(
            {
                tag: existTag._id,
                name: category
            }
        );

        if (!existTag || !existCategory) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Tag or Category does not exist",
                    error: "Tag or Category does not exist",
                }
            )
        }

        // upload image to cloudinary
        const imageRes = await uploadMultipleFile(
            images,
            process.env.FOLDER_IMAGES,
        );

        if (!imageRes) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Images upload failed",
                    error: "Images upload failed",

                }
            )
        }

        const imagesUrl = [];

        imageRes.forEach((image) => {
            imagesUrl.push(image?.secure_url);
        });

        // create entry in database
        const newProduct = await Product.create(
            {
                name: name,
                price: price,
                description: description,
                category: existCategory._id,
                tag: existTag._id,
                stock: stock,
                images: imagesUrl,
                productDetails: details
            }
        );

        // push this product in category db
        const updatedCat = await Category.findByIdAndUpdate(
            { _id: existCategory._id },
            {
                $push: {
                    products: newProduct._id
                }
            },
            { new: true }
        )


        // images: imageRes.secure_url,
        return res.status(200).json(
            {
                success: true,
                message: "Product Creation Successfully",
                data: { newProduct, updatedCat },
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Product Creation Failed",
                error: err.message,
            }
        );
    }

}


exports.getAllProducts = async (req, res) => {
    try {

        const page = parseInt(req.query.currPage);
        const limit = parseInt(req.query.limit);

        const totalProducts = await Product.countDocuments();

        const totalPages = Math.ceil(totalProducts / limit);

        const data = await Product.find({})
            .populate('category')
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        return res.status(200).json(
            {
                success: true,
                message: "Get All Products Successfully",
                data: {
                    totalPages: totalPages,
                    totalProducts: totalProducts,
                    data: data,
                },
            }
        );


    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get All Products Failed",
                error: err.message,
            }
        );
    }

}


exports.getProductById = async (req, res) => {
    try {

        const productId = req.params.id;

        // check product in database
        const existProduct = await Product.findById(productId)
            .populate("category")
            .exec();


        if (!existProduct) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Product doesn't exist Successfully",
                    error: "Product doesn't exist Successfully",
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "Get Product By Id Successfully",
                data: existProduct,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get Product By Id Failed",
                error: err.message,
            }
        );
    }
}


// get Top selling products
exports.getTopSellingProducts = async (req, res) => {

    try {
        // get tagId from frontend
        const { tagId } = req.params;

        let data = [];
        let allData;

        if (tagId === "All") {
            allData = await Tag.find({})
                .populate(
                    {
                        path: 'categories',
                        populate: {
                            path: 'products',
                            model: 'Product', // Assuming 'Product' is the actual model name
                        },
                    }
                ).exec();

            // push products into data array
            allData.forEach((tag) => {
                tag.categories.forEach((category) => {
                    category?.products?.forEach((product) => {
                        data.push(product)
                    })
                });
            }

            )
        } else {

            allData = await Tag.findById(tagId)
                .populate(
                    {
                        path: 'categories',
                        populate: {
                            path: 'products',
                            model: 'Product', // Assuming 'Product' is the actual model name
                        },
                    }
                )
                .exec();

            // push products into data array
            allData.categories.forEach((category) => {
                category?.products?.forEach((product) => {
                    data.push(product)
                })
            });
        }

        const topSelling = data.sort((a, b) => b.sales - a.sales).slice(0, 10);


        return res.status(200).json(
            {
                success: true,
                message: "Get top selling products By tag Successfully",
                data: topSelling,
            }
        )

    } catch (error) {

        console.error(error);
        return res.status(500).json(
            {
                success: false,
                message: "Get Top Selling Products Failed ",
                error: error.message,
            }
        );

    }
};


// In this method, products in similar category for similar tag are fetched
exports.getSimilarProducts = async (req, res) => {
    try {

        // product Id
        const { productId } = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(400).json(
                {
                    success: false,
                    message: "product doesn't exist",
                    error: "product doesn't exist",
                }
            )
        }
        const categoryId = product.category?._id;

        // check product in database
        const existCategory = await Category.findById(categoryId)
            .populate("products")
            .exec();

        if (!existCategory) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Category doesn't exist",
                    error: "Category doesn't exist",
                }
            )
        }

        // remove the product whose id is same as product id bcz it is related products to the that product
        const data = existCategory?.products?.filter((data) => data._id != productId);

        return res.status(200).json(
            {
                success: true,
                message: "Get Related Product Successfully",
                data: data,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get Related Product Failed",
                error: err.message,
            }
        );
    }
}


exports.getProductsByCategory = async (req, res) => {

    try {
        const { categoryId } = req.params;
        const page = parseInt(req.query.currPage);
        const limit = parseInt(req.query.limit);

        // Get the total number of products in the category
        const category = await Category.findById(categoryId).populate("products").exec();
        const totalProducts = category.products.length;

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalProducts / limit);

        // Calculate the skip value based on the page and limit
        const skip = (page - 1) * limit;

        // Query the database with pagination
        const paginatedProducts = await Category.findById(categoryId)
            .populate({
                path: 'products',
                options: {
                    skip: skip,
                    limit: limit,
                },
            })
            .exec();


        if (!category) {
            return res.status(400).json(
                {
                    success: false,
                    message: "category doesn't exist Successfully",
                    error: "category doesn't exist Successfully",
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "Get Product By category Successfully",
                data: {
                    data: paginatedProducts.products,
                    totalPages: totalPages,
                    totalProducts: totalProducts,
                }
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get Product By category  Failed",
                error: err.message,
            }
        );
    }
}


exports.getProductByTag = async (req, res) => {

    try {
        const { tagId } = req.params;
        const page = parseInt(req.query.currPage);
        const limit = parseInt(req.query.limit);

        // check tag in database
        const allData = await Tag.findById(tagId)
            .populate(
                {
                    path: 'categories',
                    populate: {
                        path: 'products',
                        model: 'Product', // Assuming 'Product' is the actual model name
                    },
                }
            )
            .exec();

        if (!allData) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Tag doesn't exist Successfully",
                    error: "Tag doesn't exist Successfully",
                }
            )
        }

        // Flatten the products array from categories
        let allProducts = [];
        allData.categories.forEach((category) => {
            allProducts = allProducts.concat(category.products);
        });

        // Calculate the total number of products and total pages
        const totalProducts = allProducts.length;
        const totalPages = Math.ceil(totalProducts / limit);

        // Calculate the skip value based on the page and limit
        const skip = (page - 1) * limit;

        // Get the paginated products based on the skip and limit
        const paginatedProducts = allProducts.slice(skip, skip + limit);

        return res.status(200).json({
            success: true,
            message: "Get Products By Tag Successfully",
            data: {
                data: paginatedProducts,
                totalPages: totalPages,
                totalProducts: totalProducts,
            },
        });

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get ProductByTag  Failed",
                error: err.message,
            }
        );
    }
}


exports.getProductsByFiltering = async (req, res) => {

    try {
        const { query } = req.params;


        let data = [];

        if (query === "price-low-to-high") {

            // Sort by price in ascending order
            data = await Product.find().sort({ price: 1 });

        } else if (query === "price-high-to-low") {

            // Sort by price in descending order
            data = await Product.find().sort({ price: -1 });

        } else if (query === "popularity") {

            // Sort by sales in descending order
            data = await Product.find().sort({ sales: -1 });

        } else if (query === "rating-high-to-low") {

            // Sort by rating in descending order
            data = await Product.find().sort({ "averageRating": -1 });

        } else if (query === "rating-low-to-high") {

            // Sort by rating in descending order
            data = await Product.find().sort({ "averageRating": 1 });

        } else if (query === "priceRange-min-max") {

            const minPrice = query.split("-")[1];
            const maxPrice = query.split("-")[2];

            data = await Product.find({
                price: { $gte: minPrice, $lte: maxPrice }
            });
        }

        return res.status(200).json(
            {
                success: true,
                message: "Get ProductBy filtering Successfully",
                data: data,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get ProductBy filtering  Failed",
                error: err.message,
            }
        );
    }
}


exports.getProductsBySearch = async (req, res) => {
    try {
        const { query } = req.params;
        const lowerCaseQuery = query.toLowerCase();

        const page = parseInt(req.query.currPage);
        const limit = parseInt(req.query.limit);

        const allProducts = await Product.find({});

        // Filter products based on the search query
        const filteredProducts = allProducts.filter((product) => {
            const lowerCaseName = product.name.toLowerCase();
            const lowerCaseDescription = product.description.toLowerCase();

            return lowerCaseName.includes(lowerCaseQuery) || lowerCaseDescription.includes(lowerCaseQuery);
        });

        // Calculate the total number of products and total pages
        const totalProducts = filteredProducts.length;
        const totalPages = Math.ceil(totalProducts / limit);

        // Calculate the skip value based on the page and limit
        const skip = (page - 1) * limit;

        // Get the paginated products based on the skip and limit
        const paginatedProducts = filteredProducts.slice(skip, skip + limit);


        return res.status(200).json(
            {
                success: true,
                message: "Get Product By search  successfully",
                data: {
                    data: paginatedProducts,
                    totalProducts: totalProducts,
                    totalPages: totalPages
                },
            }
        );
    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get Product By Search  Failed",
                error: err.message,
            }
        );
    }
}












