const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const Razorpay = require('razorpay');
require('dotenv').config();

exports.updateProductSale = async (req, res) => {
    try {
        const { orderId } = req.body;

        console.log(orderId);

        const order = await Order.findById(orderId)
            .populate('products')
            .exec();

        order.products.forEach(async ({ product, quantity }) => {
            // Update the sales count for each product in the order
            const product1 = await Product.findById(product);
            product1.sales += quantity;
            await product1.save();
        });

        return res.status(200).json(
            {
                success: true,
                message: "update product sales successfully",
                data: order
            }
        );

    } catch (err) {

        return res.status(500).json(
            {
                success: false,
                message: "update product sales failed",
                error: err.message
            }
        );
    }
}

exports.createOrder = async (req, res) => {
    try {

        const { cartItems, userId } = req.body;

        let user = await User.findById(userId);

        // user exist or not
        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User not found",
                    error: "User not found",
                }
            );
        }

        const orderProducts = [];

        // Loop through each product in the request
        for (const productInfo of cartItems) {
            const quantity = productInfo.quantity;
            const productId = productInfo?.product?._id;

            // Fetch the product details including status from the database
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            // Add the product details to the orderProducts array, including the status
            orderProducts.push({
                product: productId,
                quantity: quantity,
                status: "Pending",
                amount: quantity * product?.price,
            });
        }


        const totalAmount = orderProducts.reduce((acc, product) => acc + product.amount, 0);

        // Create the order
        const order = await Order.create({
            user: userId,
            products: orderProducts,
            createdAt: new Date(),
            amount: totalAmount,
            paymentOption: "Razorpay",
        });

        return res.status(200).json(
            {
                success: true,
                message: "Order creation successfully",
                data: order
            }
        );

    }
    catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Order creation Failed",
                error: err.message,
            }
        );

    }
}


exports.createOrderByRazorpay = async (req, res) => {
    try {

        const instance = new Razorpay(
            {
                key_id: process.env.RAZORPAY_KEYID,
                key_secret: process.env.RAZORPAY_KEYSECRET,
            }
        )

        const { order } = req.body;

        const options = {
            amount: order.amount * 100,
            currency: "INR",
            receipt: order.orderId,
            payment_capture: 1
        }

        const orderRes = await instance.orders.create(options);

        if (!orderRes) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Order creation with razorpay failed",
                    error: "Order creation with razorpay failed",
                }
            );
        }

        return res.status(200).json(
            {
                success: true,
                message: "Order creation with razorpay successfully",
                data: orderRes
            }
        );

    }
    catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Order creation with razorpay Failed",
                error: err.message,
            }
        );

    }
}

exports.cardDetail = async (req, res, next) => {
    try {

        const instance = new Razorpay(
            {
                key_id: process.env.RAZORPAY_KEYID,
                key_secret: process.env.RAZORPAY_KEYSECRET,
            }
        );

        const { razorpayId } = req.body;

        const order = await instance.payments.fetch(razorpayId);

        if (!order) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Order fetched with razorpay failed",
                    error: "Order fetched with razorpay failed",
                }
            );
        }

        return res.status(200).json(
            {
                success: true,
                message: "Order fetchde with razorpay successfully",
                data: order
            }
        );

    }
    catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Order fetched with razorpay Failed",
                error: err.message,
            }
        );

    }
}


// const options = {
//     amount: 50000, // amount in paise (e.g., for ₹500, multiply by 100)
//     currency: 'INR',
// };

// razorpay.orders.create(options, (err, order) => {
//     if (err) {
//         return res.status(500).json({ error: 'Error creating order' });
//     }

//     res.json({ order_id: order.id });
// });

