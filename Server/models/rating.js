const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        rating: {
            type: Number,
            required: true,
            Max: 10,
            Min: 0
        }
    }
);

module.exports = mongoose.model("Rating", ratingSchema);