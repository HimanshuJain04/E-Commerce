const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        tag: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId
            }
        ]
    }
);

module.exports = mongoose.model("Category", categorySchema);