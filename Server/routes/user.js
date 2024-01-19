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
const { getOrderDetailsById } = require('../controllers/order');
const { updateRatingAndReview } = require("../controllers/user");
const { addProductIntoRecentView } = require("../controllers/user");
const { updateUserInfo } = require("../controllers/user");
const { changePassword } = require("../controllers/user");


// update the user
router.post("/updateUserAddress", updateUserAddress);
router.post("/updateUserInfo", updateUserInfo);
router.post("/changePassword", changePassword);

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

// update userData
router.post("/addProductIntoRecentView/", addProductIntoRecentView);


// order
router.post("/createOrder", createOrder);
router.post("/getOrderDetailsById", getOrderDetailsById);
router.post("/createOrderByRazorpay", createOrderByRazorpay);
router.get("/cardDetail", cardDetail);
router.post("/payment/verifyPayment", verifyPayment);
router.post("/updateOrders", updateOrders);

// rating and review
router.post("/updateRatingAndReview", updateRatingAndReview);


module.exports = router;
