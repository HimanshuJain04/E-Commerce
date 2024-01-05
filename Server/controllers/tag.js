const Tag = require("../models/tag");


exports.createTag = async (req, res) => {
    try {

        // fetch the data from request
        const { name } = req.body;

        // validation
        if (!name) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields Required",
                    error: " All Fields Required"
                }
            )
        }

        // check tag is already exist or not
        const existTag = await Tag.findOne({ name: name });

        if (existTag) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Tag already exist",
                    error: "Tag already exist",
                }
            )
        }

        const data = await Tag.create(
            {
                name: name
            }
        );

        return res.status(200).json(
            {
                success: true,
                message: "Tag Creation Successfully",
                data: data,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Tag Creation Failed",
                error: err.message,
            }
        );
    }
}



exports.getAllTags = async (req, res) => {
    try {

        const data = await Tag.find({});

        return res.status(200).json(
            {
                success: true,
                message: "Get all tags Successfully",
                data: data,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get all tags Failed",
                error: err.message,
            }
        );
    }
}