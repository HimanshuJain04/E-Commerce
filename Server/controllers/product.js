const User = require("../models/user");
const Rating = require("../models/rating");
const Review = require("../models/review");
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


// TODO: send only limited data to the user
exports.getAllProducts = async (req, res) => {
    try {

        // create entry in database
        const data = await Product.find({})
            .populate("category")
            .exec();

        return res.status(200).json(
            {
                success: true,
                message: "Get All Products Successfully",
                data: data,
            }
        )

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

        // check tag in database
        const allData = await Category.findById(categoryId)
            .populate("products")
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

        return res.status(200).json(
            {
                success: true,
                message: "Get Product By category Successfully",
                data: allData.products,
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

        let tagData = [];

        allData?.categories?.forEach((categories) => {
            categories?.products?.map((product) => {
                tagData.push(product);
            })
        })

        return res.status(200).json(
            {
                success: true,
                message: "Get ProductByTag Successfully",
                data: tagData,
            }
        )

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


// TODO: check name as well as description of product for better results
exports.getProductsBySearch = async (req, res) => {
    try {

        let { query } = req.params;
        query = query.toLowerCase()

        const allProducts = await Product.find({});

        const data = allProducts.filter((product) => {
            return product.name.toLowerCase().includes(query)
        });

        return res.status(200).json(
            {
                success: true,
                message: "Get Product By search  successfully",
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











