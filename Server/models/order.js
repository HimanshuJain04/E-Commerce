const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                status: ["Pending", "Accepted", "Rejected", "Delivered"]
            }
        ],

    }
);

module.exports = mongoose.model("Order", orderSchema);