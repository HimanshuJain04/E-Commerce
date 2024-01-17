const mongoose = require('mongoose');

const ratingReviewSchema = new mongoose.Schema(
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
            Max: 5,
            Min: 0
        },
        review: {
            type: String,
            trim: true,
        }
    }
);

module.exports = mongoose.model("RatingAndReview", ratingReviewSchema);