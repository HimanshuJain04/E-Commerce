const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const Razorpay = require('razorpay');
const axios = require('axios');
const base64 = require('base-64');
const Category = require("../models/category");
const Tag = require("../models/tag");
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
            product1.stock -= quantity;
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



exports.updateProductStatus = async (req, res) => {
    try {

        const { orderId, productId, status } = req.body;

        console.log(orderId, productId, status);

        const orders = await Order.findById(orderId);

        if (!orders) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Order not found",
                    error: "Order not found",
                }
            );
        }

        const product = orders.products.find(product => product._id.toString() === productId)

        if (!Product) {
            return res.status(400).json(
                {
                    success: false,
                    message: "product not found",
                    error: "Product not found",
                }
            );
        }

        product.status = status;

        await orders.save();

        return res.status(200).json(
            {
                success: true,
                message: "Update Product Status successfully",
                data: []
            }
        );

    }
    catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Update Product Status Failed",
                error: err.message,
            }
        );

    }
}


exports.deleteOrderbyId = async (req, res) => {
    try {

        const { id } = req.params;

        await Order.findByIdAndDelete(id);

        return res.status(200).json(
            {
                success: true,
                message: "Delete Order by id successfully",
                data: []
            }
        );

    }
    catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Delete Order by id Failed",
                error: err.message,
            }
        );

    }
}


exports.getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find({})
            .populate("products.product")
            .exec();

        return res.status(200).json(
            {
                success: true,
                message: "Get All Orders successfully",
                data: orders
            }
        );

    }
    catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get All Orders Failed",
                error: err.message,
            }
        );

    }
}


exports.createOrder = async (req, res) => {
    try {

        const { cartItems, email, address } = req.body;

        let user = await User.findOne({ email });

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
            userInfo: {
                email,
                address
            },
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

        const { userEmail, orderId } = req.body;

        console.log(userEmail, orderId)

        let user = await User.findOne({ email: userEmail });

        user.orders.push(orderId);
        user.carts = [];

        await user.save();

        user = await User.findById(user._id)
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

exports.getLatestOrders = async (req, res) => {
    try {

        let allOrders = await Order.find({})
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json(
            {
                success: true,
                data: allOrders,
                message: "Get total revenue Success"
            }
        );

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                error: error.message,
                message: "Get total revenue failed"
            }
        )
    }
}


exports.getTodaysDetails = async (req, res) => {
    try {

        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00:000 for the start of the day

        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);


        const todaysOrders = await Order.find({
            createdAt: {
                $gte: startDate, // Greater than or equal to startDate
                $lte: endDate    // Less than or equal to endDate
            }
        });

        // Aggregate total sales for each day
        const todaysRevenue = todaysOrders.reduce((acc, order) => {
            return acc += order.amount;
        }, 0);

        res.status(200).json(
            {
                success: true,
                data: [todaysRevenue, todaysOrders.length],
                message: "Get total revenue Success"
            }
        );

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                error: error.message,
                message: "Get total revenue failed"
            }
        )
    }
}


exports.getTotalDetails = async (req, res) => {
    try {

        const allOrders = await Order.find({});

        const totalProducts = await Product.find({});

        // Aggregate total sales for each day
        const totalRevenue = allOrders.reduce((acc, order) => {
            return acc += order.amount;
        }, 0);

        res.status(200).json(
            {
                success: true,
                data: [totalProducts.length, totalRevenue, allOrders.length],
                message: "Get total revenue Success"
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                error: error.message,
                message: "Get total revenue failed"
            }
        )
    }
}


exports.generateDailySalesReport = async (req, res) => {
    try {

        // Calculate the date 30 days ago
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        // Query orders created within the last 10 days
        const last30DaysOrders = await Order.find({
            createdAt: { $gte: startDate }
        });


        // Aggregate total sales for each day
        const dailySales = last30DaysOrders.reduce((acc, order) => {
            // Extract date in YYYY-MM-DD format
            const date = order.createdAt.toISOString().split('T')[0];
            
            // Add order amount to total sales for the corresponding day
            acc[date] = (acc[date] || 0) + order.amount;
            return acc;
        }, {});

        // Format data for presentation
        const formattedData = Object.keys(dailySales).map(date => ({
            date,
            totalSales: dailySales[date]
        }));

        res.status(200).json(
            {
                success: true,
                data: formattedData,
                message: "Generating daily sales report Success"
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                error: error.message,
                message: "Generating daily sales report failed"
            }
        )
    }
}


exports.getCategoryStats = async (req, res) => {
    try {

        // Fetch all categories
        const allCategories = await Category.find({}).populate('tag').exec();

        // Initialize category counts to 0 for all categories
        const category = {};
        allCategories.forEach(cat => {
            const categoryName = `${cat.tag.name}-${cat.name}`;
            category[categoryName] = 0;
        });

        const allOrders = await Order.find({})
            .populate(
                {
                    path: "products.product",
                    populate: {
                        path: "category",
                        populate: {
                            path: "tag",
                            model: "Tag"
                        }
                    }
                }
            )
            .exec();

        allOrders.forEach((order) => {
            order.products.forEach(({ product }) => {
                const productTag = product.category.tag.name;
                const productcategory = product.category.name;

                if (`${productTag}-${productcategory}` in category) {
                    // increase the value
                    category[`${productTag}-${productcategory}`]++;

                } else {
                    throw new Error("New Category Found");
                }
            });
        });

        return res.status(200).json(
            {
                success: true,
                message: "Get all category stats Successfully",
                data: category,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get all category stats Failed",
                error: err.message,
            }
        );
    }
}


exports.getTagStats = async (req, res) => {
    try {

        const allTags = await Tag.find({});

        const tags = {};

        allTags.forEach(tag => {
            tags[tag.name] = 0;
        })

        const allOrders = await Order.find({})
            .populate(
                {
                    path: "products.product",
                    populate: {
                        path: "category",
                        populate: {
                            path: "tag",
                            model: "Tag"
                        }
                    }
                }
            )
            .exec();



        allOrders.forEach((order) => {
            order.products.forEach(({ product }) => {
                const productTag = product.category.tag.name;

                if (productTag in tags) {
                    // increase the value
                    tags[productTag]++;

                } else {
                    throw new Error("New Tag Found");
                }
            });
        });


        return res.status(200).json(
            {
                success: true,
                message: "Get all tags stats Successfully",
                data: tags,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get all tags stats Failed",
                error: err.message,
            }
        );
    }
}




