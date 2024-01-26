const mongoose = require('mongoose');

// TODO: Add Variation Field in schema like - color, size etc...

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
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
            trim: true,
        },
        brand: {
            type: String,
            trim: true
        },
        availability: {
            type: String,
            enum: ['In Stock', 'Out of Stock', 'Preorder'],
            default: 'In Stock',
        },
        weight: {
            type: Number,
        },
        dimensions: {
            length: Number,
            width: Number,
            height: Number,
        },
        basePrice: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
        },
        highlights: [
            {
                type: String,
                trim: true
            }
        ],
        details: {
            type: String,
            trim: true,
        },
        images: {
            type: [String],
            required: true,
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        rating_review: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RatingAndReview"
            }
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

// variations: [
//     {
//         size: String,
//         color: String,
//         price: Number,
//         stock: Number,
//     },
// ],