const Tag = require("../models/tag");
const Category = require("../models/category");


exports.createCategory = async (req, res) => {
    try {

        // fetch the data from request
        const { name, tagName } = req.body;

        // validation
        if (!name || !tagName) {
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
                name: tagName
            }
        );

        if (!existTag) {
            return res.status(400).json(
                {
                    success: false,
                    message: "tag is not exist",
                    error: "tag is not exist",
                }
            )
        }


        // check categroy is already exist or not
        const existCategory = await Category.findOne(
            { name: name, tag: existTag._id }
        );


        if (existCategory) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Category already exist",
                    error: "Category already exist",
                }
            )
        }
        // create category for that tag
        const data = await Category.create(
            {
                name: name,
                tag: existTag._id
            }
        );

        // push category into tag db
        const tagData = await Tag.findByIdAndUpdate(
            {
                _id: existTag._id,
            },
            {
                $push: {
                    categories: data._id
                }
            },
            { new: true }
        )

        // return response
        return res.status(200).json(
            {
                success: true,
                message: "Category Creation Successfully",
                data: { data, tagData },
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Category Creation Failed",
                error: err.message,
            }
        );
    }
}


exports.getAllCategory = async (req, res) => {
    try {

        const data = await Category.find({}).populate('tag').exec();

        return res.status(200).json(
            {
                success: true,
                message: "Get all category Successfully",
                data: data,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get all category Failed",
                error: err.message,
            }
        );
    }
}

