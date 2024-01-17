const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(

    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                },
                status: {
                    type: String,
                    enum: ["Accepted", "Rejected", "Pending", "Delivery pending", "Delivered"]
                },
                DeliveredAt: {
                    type: Date
                },
                isReviewed: {
                    type: Boolean,
                    default: false,
                }
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true
        },
        amount: {
            type: Number,
            required: true,
        },
        paymentOption: {
            type: String,
            enum: ["COD", "Razorpay"],
            required: true,
        }
    }
);

module.exports = mongoose.model("Order", orderSchema);