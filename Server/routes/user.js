const express = require('express');
const router = express.Router();

const { removeFromWishlist } = require('../controllers/user');
const { addToWishlist } = require('../controllers/user');
const { getAllWishlistData } = require('../controllers/user');
const { getAllCartData } = require('../controllers/user');
const { getAllOrders } = require('../controllers/user');
const { getAllUserData } = require('../controllers/user');
const { addToCart } = require('../controllers/user');
const { removeFromCart } = require('../controllers/user');
const { descreaseFromCart } = require('../controllers/user');

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


module.exports = router;
