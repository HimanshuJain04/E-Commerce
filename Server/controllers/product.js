const User = require("../models/user");
const Product = require("../models/product");
const Category = require("../models/category");
const Tag = require("../models/tag");
const { uploadMultipleFile } = require("../utils/uploadFileToCloudinary");
require('dotenv').config();

function getSortOption(filter) {
    switch (filter) {
        case "popularity":
            return { sales: -1 };
        case "price-high-to-low":
            return { price: -1 };
        case "price-low-to-high":
            return { price: 1 };
        case "rating-high-to-low":
            return { averageRating: -1 };
        case "rating-low-to-high":
            return { averageRating: 1 };
        default:
            // Default sorting or custom sorting logic for "relevance"
            return {};
    }
}


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
        const filter = (req.query.filter);
        const minPrice = parseInt(req.query.minPrice);
        const maxPrice = parseInt(req.query.maxPrice);

        const totalProducts = await Product.countDocuments({
            price: { $gte: minPrice, $lte: maxPrice },
        });

        const totalPages = Math.ceil(totalProducts / limit);

        const sortOptions = getSortOption(filter);


        const data = await Product.find({
            price: { $gte: minPrice, $lte: maxPrice },
        })
            .populate({
                path: 'category',
            })
            .sort(sortOptions)
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

// TODO: delete images from cloudinary
exports.deleteProductById = async (req, res) => {
    try {

        const { id } = req.params;

        await Product.findByIdAndDelete(id);

        return res.status(200).json(
            {
                success: true,
                message: "delete Product by id Successfully",
                data: []
            }
        );


    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "delete Product by id Failed",
                error: err.message,
            }
        );
    }

}

exports.getAllProductsAtOnce = async (req, res) => {
    try {

        const products = await Product.find({});

        return res.status(200).json(
            {
                success: true,
                message: "Get All Products At Once Successfully",
                data: products
            }
        );


    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get All Products At Once Failed",
                error: err.message,
            }
        );
    }

}

exports.updateProductById = async (req, res) => {
    try {

        // extract data from request
        const { id } = req.params;
        const {
            name,
            price,
            basePrice,
            discount,
            weight,
            averageRating,
            description,
            availability,
            dimensions,
            highlights,
            brand,
            stock,
            details
        } = req.body;

        // Construct update object with extracted fields
        const updateFields = {
            name,
            price,
            basePrice,
            discount,
            weight,
            averageRating,
            description,
            availability,
            dimensions,
            highlights,
            brand,
            stock,
            details
        };

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Product doesn't exist",
                    error: "Product doesn't exist",
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "update Product By Id Successfully",
                data: updatedProduct,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "update Product By Id Failed",
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
            .populate("rating_review")
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

// TODO: send only 10 products
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
                )
                .exec();

            // push products into data array
            allData.forEach((tag) => {
                tag.categories.forEach((category) => {
                    category?.products?.forEach((product) => {
                        data.push(product)
                    })
                });
            });

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
        const filter = req.query.filter;
        const minPrice = parseInt(req.query.minPrice);
        const maxPrice = parseInt(req.query.maxPrice);

        // Get the total number of products in the category
        const category = await Category.findById(categoryId)
            .populate("products")
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

        let products = category.products;

        // Apply the price range condition if provided
        if (minPrice !== undefined || maxPrice !== undefined) {
            products = products.filter(product => {
                const price = product.price;
                return (minPrice === undefined || price >= minPrice) &&
                    (maxPrice === undefined || price <= maxPrice);
            });
        }


        const totalProducts = products.length;

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalProducts / limit);

        // Calculate the skip value based on the page and limit
        const skip = (page - 1) * limit;

        const sortOptions = getSortOption(filter);

        // Query the database with pagination
        const paginatedProducts = await Category.findById(categoryId)
            .populate({
                path: 'products',
                match: { _id: { $in: products.map(p => p._id) } }, // Use _id for matching
            })
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .exec();

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
        const filter = req.query.filter;
        const minPrice = parseInt(req.query.minPrice);
        const maxPrice = parseInt(req.query.maxPrice);

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


        // min and max functionality
        if (minPrice !== undefined || maxPrice !== undefined) {
            allProducts = allProducts.filter((product) => {
                const price = product.price;
                return (minPrice === undefined || price >= minPrice) &&
                    (maxPrice === undefined || price <= maxPrice);
            })
        }

        // Apply sorting based on the filter
        const sortOptions = getSortOption(filter);
        allProducts.sort((a, b) => {
            for (const key in sortOptions) {
                const comparison = sortOptions[key] * (a[key] - b[key]);
                if (comparison !== 0) return comparison;
            }
            return 0;
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


exports.getProductsBySearch = async (req, res) => {
    try {
        const { query } = req.params;
        const lowerCaseQuery = query.toLowerCase();

        const allProducts = await Product.find({});

        let allData = allProducts.filter((product) => {
            const lowerCaseName = product.name.toLowerCase();
            const lowerCaseDescription = product.description.toLowerCase();

            return lowerCaseName.includes(lowerCaseQuery) || lowerCaseDescription.includes(lowerCaseQuery);
        });

        let data = [];

        if (allData.length > 5) {
            for (let i = 0; i < 5; i++) {
                data.push(allData[i]);
            }

        } else {
            data = [...allData];
        }


        return res.status(200).json(
            {
                success: true,
                message: "Get Product By Search success",
                data: data,
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



exports.getProductsByNameAndDesc = async (req, res) => {
    try {
        const { query } = req.params;
        const lowerCaseQuery = query.toLowerCase();

        const page = parseInt(req.query.currPage);
        const limit = parseInt(req.query.limit);
        const filter = req.query.filter;
        const minPrice = parseInt(req.query.minPrice);
        const maxPrice = parseInt(req.query.maxPrice);

        const allProducts = await Product.find({});

        // Filter products based on the search query
        let filteredProducts = allProducts.filter((product) => {
            const lowerCaseName = product.name.toLowerCase();
            const lowerCaseDescription = product.description.toLowerCase();

            return lowerCaseName.includes(lowerCaseQuery) || lowerCaseDescription.includes(lowerCaseQuery);
        });

        // min and max functionality
        if (minPrice !== undefined || maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter((product) => {
                const price = product.price;
                return (minPrice === undefined || price >= minPrice) &&
                    (maxPrice === undefined || price <= maxPrice);
            })
        }



        // Apply sorting based on the filter
        const sortOptions = getSortOption(filter);
        filteredProducts.sort((a, b) => {
            for (const key in sortOptions) {
                const comparison = sortOptions[key] * (a[key] - b[key]);
                if (comparison !== 0) return comparison;
            }
            return 0;
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














