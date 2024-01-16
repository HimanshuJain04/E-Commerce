const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const Razorpay = require('razorpay');
const axios = require('axios');
const base64 = require('base-64');
require('dotenv').config();
const { sendPurchaseConfirmationEmail } = require("../utils/sendMail");


exports.updateProductSale = async (req, res) => {
    try {
        const { orderId } = req.body;

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

// TODO : remove this method
exports.getOrderDetailsById = async (req, res) => {
    try {

        const { orderId } = req.r;

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
        );

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


exports.updateOrders = async (req, res) => {
    try {

        const { userId, orderId } = req.body;

        let user = await User.findById(userId);

        user.orders.push(orderId);
        user.carts = [];

        await user.save();

        user = await User.findById(userId)
            .populate("wishlists")
            .populate("carts.product")
            .populate(
                {
                    path: 'orders',
                    populate: {
                        path: 'products.product',
                        model: 'Product',
                    },
                }
            )
            .exec();

        await sendPurchaseConfirmationEmail(user.email, orderId)

        return res.status(200).json(
            {
                success: true,
                message: "Orders update successfully",
                data: user
            }
        );

    }
    catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Orders update Failed",
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

        const order = await instance.orders.fetch(razorpayId);
        const order1 = await instance.orders.fetchPayments(razorpayId);

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
                data: [order, order1]
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


exports.verifyPayment = async (req, res) => {

    const { paymentId } = req.body;

    // Replace these with your actual Razorpay API key and secret
    const razorpayApiKey = process.env.RAZORPAY_KEYID;
    const razorpayApiSecret = process.env.RAZORPAY_KEYSECRET;

    // Construct the API endpoint URL
    const apiUrl = `https://api.razorpay.com/v1/payments/${paymentId}`;

    // Set up headers with your Razorpay API key and secret
    const headers = {
        'Authorization': `Basic ${base64.encode(`${razorpayApiKey}:${razorpayApiSecret}`)}`
    };

    try {
        // Make a GET request to the Razorpay API
        const response = await axios.get(apiUrl, { headers });

        // Check if the request was successful (HTTP status code 200)
        if (response.status === 200) {

            // Parse the JSON response
            const paymentData = response?.data;


            // Check the payment status in the response
            if (paymentData.status === 'captured') {

                return res.status(200).json({
                    success: true,
                    message: 'Payment and order processed successfully.',
                    data: paymentData
                });

            } else {
                // Payment is not successful
                return res.status(400).json({
                    success: false,
                    message: 'Payment verification failed.',
                    error: 'Payment verification failed.'
                });
            }
        } else {
            // Handle unsuccessful request
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed.',
                error: 'Payment verification failed.'
            });
        }
    } catch (error) {
        // Handle exceptions
        return res.status(500).json({
            success: false,
            message: 'Payment verification failed.',
            error: error.message
        });
    }

}




