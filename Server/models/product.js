const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        price: {
            type: Number,
            required: true,
        },
        sales: {
            type: Number,
            default: 0,
        },
        stock: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        images: {
            type: [String],
            required: true,
        },
        rating: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Rating"
            }
        ],
        review: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review"
            }
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    }
);

module.exports = mongoose.model("Product", productSchema);