const express = require('express');
const router = express.Router();
const User = require("../models/user");

const { userSignup } = require("../controllers/auth");
const { userLogin } = require("../controllers/auth");
const { Auth } = require("../middleware/auth");
const { userVerification } = require("../controllers/verification");
const { sendOTPForForgotPassword, VerifyOtpForgotPassword } = require("../controllers/auth");

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.get("/verify/:uniqueString/:userId", userVerification);
router.post("/sendOTPForForgotPassword", sendOTPForForgotPassword);
router.post("/VerifyOtpForgotPassword", VerifyOtpForgotPassword);

router.get("/validate", Auth, async (req, res) => {
    try {
        const data = await User.findById(req.user.id)
            .populate("carts.product")
            .populate("wishlists")
            .populate("recentlyViewed.product")
            .populate(
                {
                    path: 'orders',
                    populate: {
                        path: 'products.product',
                        model: 'Product',
                    },
                }
            ).exec();

        res.status(201).json({
            success: true,
            data: data,
        });

    } catch (err) {
        res.status(401).json({
            success: false,
            error: err.message,
        });
    }
});


module.exports = router;
