const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        profileImg: {
            type: String,
        },
        gender: {
            type: String,
        },
        phoneNo: {
            type: Number,
        },
        carts: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: Number
            }
        ],
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        wishlists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        token: {
            type: String,
            default: "",
        },
        verified: {
            type: Boolean
        },
        address: {
            type: String,
            trim: true,
        }

    }
);

module.exports = mongoose.model("User", userSchema);