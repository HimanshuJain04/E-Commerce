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
        const { name, price, stock, description, category, tag } = req.body;

        const images = req?.files?.images;

        // validation
        if (!name || !price || !description || !images || !stock || !category || !tag) {
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
            .populate('tag')
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
            .populate('tag')
            .exec();


        if (!existProduct) {
            return res.status(400).json(
                {
                    success: true,
                    message: "Product doesn't exist Successfully",
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


// TODO: Update this method
exports.getRelatedProducts = async (req, res) => {
    try {

        // product Id
        const productId = req.params.id;

        // check product in database
        const existProduct = await Product.findById(productId);
        if (!existProduct) {
            return res.status(400).json(
                {
                    success: true,
                    message: "Product doesn't exist Successfully",
                }
            )
        }

        // get product id and tag id
        const categoryId = existProduct?.category?._id;
        const tagId = existProduct?.tag?._id;

        // get product which matches the category and tag id
        const allData = await Product.find({ category: categoryId, tag: tagId })
            .populate('category')
            .populate('tag')
            .exec();

        // remove the product whose id is same as product id bcz it is related products to the that product
        const data = allData.filter((data) => data._id != productId);

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


// TODO: Create this method
exports.getProductsByCategory = async (req, res) => {

    try {
        // product Id
        const productId = req.params.id;

        // check product in database
        const existProduct = await Product.findById(productId);
        if (!existProduct) {
            return res.status(400).json(
                {
                    status: true,
                    message: "Product doesn't exist Successfully",
                }
            )
        }

        // get product id and tag id
        const categoryId = existProduct?.category?._id;
        const tagId = existProduct?.tag?._id;

        // get product which matches the category and tag id
        const allData = await Product.find({ category: categoryId, tag: tagId })
            .populate('category')
            .populate('tag')
            .exec();

        // remove the product whose id is same as product id bcz it is related products to the that product
        const data = allData.filter((data) => data._id != productId);

        return res.status(200).json(
            {
                status: true,
                message: "Get Related Product Successfully",
                data: data,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                status: false,
                message: "Get Related Product Failed",
                error: err.message,
            }
        );
    }
}





// TODO: Create method for get products by tag name
exports.getProductsByCategory = async (req, res) => {

    try {
        // product Id
        const productId = req.params.id;

        // check product in database
        const existProduct = await Product.findById(productId);
        if (!existProduct) {
            return res.status(400).json(
                {
                    status: true,
                    message: "Product doesn't exist Successfully",
                }
            )
        }

        // get product id and tag id
        const categoryId = existProduct?.category?._id;
        const tagId = existProduct?.tag?._id;

        // get product which matches the category and tag id
        const allData = await Product.find({ category: categoryId, tag: tagId })
            .populate('category')
            .populate('tag')
            .exec();

        // remove the product whose id is same as product id bcz it is related products to the that product
        const data = allData.filter((data) => data._id != productId);

        return res.status(200).json(
            {
                status: true,
                message: "Get Related Product Successfully",
                data: data,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                status: false,
                message: "Get Related Product Failed",
                error: err.message,
            }
        );
    }
}








