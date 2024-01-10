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
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
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

    }
);

module.exports = mongoose.model("User", userSchema);