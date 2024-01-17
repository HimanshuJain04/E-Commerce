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
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: null,
        },
        basePrice: {
            type: Number,
            // required: true,
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
        variations: [
            {
                size: String,
                color: String,
                price: Number,
                stock: Number,
            },
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    }
);

module.exports = mongoose.model("Product", productSchema);