const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
            }
        ],
    },

);

module.exports = mongoose.model("Tag", tagSchema);