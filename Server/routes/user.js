const express = require('express');
const router = express.Router();

const { removeFromWishlist } = require('../controllers/user');
const { addToWishlist } = require('../controllers/user');
const { getAllOrders } = require('../controllers/user');
const { getAllUserData } = require('../controllers/user');
const { addToCart } = require('../controllers/user');
const { removeFromCart } = require('../controllers/user');
const { descreaseFromCart } = require('../controllers/user');
const { updateUserAddress } = require('../controllers/user');
const { createOrder, updateOrders } = require('../controllers/order');
const { createOrderByRazorpay } = require('../controllers/order');
const { cardDetail } = require('../controllers/order');
const { verifyPayment } = require('../controllers/order');


// update the user
router.post("/updateUserAddress", updateUserAddress);

// Wishlist Controllers
router.post("/removeFromWishlist", removeFromWishlist);
router.post("/addToWishlist", addToWishlist);

// Cart Controllers
router.post("/addToCart", addToCart);
router.post("/removeFromCart", removeFromCart);
router.post("/descreaseFromCart", descreaseFromCart);

// Order Controllers
router.get("/getAllOrders/:userId", getAllOrders);


// get All User Data in single api
router.get("/getAllUserData/:userId", getAllUserData);

// order
router.post("/createOrder", createOrder);
router.post("/createOrderByRazorpay", createOrderByRazorpay);
router.get("/cardDetail", cardDetail);
router.post("/payment/verifyPayment", verifyPayment);
router.post("/updateOrders", updateOrders);


module.exports = router;
