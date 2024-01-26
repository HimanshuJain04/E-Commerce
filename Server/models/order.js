const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(

    {
        userInfo: {
            email: {
                type: String,
                required: true,
                trim: true
            },
            address: {
                type: mongoose.Schema.Types.Mixed,
                required: true,
            }
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
        amount: {
            type: Number,
            required: true,
        },
        paymentOption: {
            type: String,
            enum: ["COD", "Razorpay"],
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);