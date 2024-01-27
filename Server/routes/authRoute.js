const express = require('express');
const router = express.Router();
const User = require("../models/user");

const {

    userSignup,
    sendOTPForForgotPassword,
    VerifyOtpForgotPassword,
    changeForgotPassword,
    userLogin,
    userLogout

} = require("../controllers/auth");

const { validateUser } = require("../middleware/auth");
const { userVerification } = require("../controllers/verification");


router.post("/login", userLogin);
router.post("/signup", userSignup);
router.get("/logout", userLogout);
router.get("/verify/:uniqueString/:userId", userVerification);
router.post("/sendOTPForForgotPassword", sendOTPForForgotPassword);
router.post("/VerifyOtpForgotPassword", VerifyOtpForgotPassword);
router.post("/changeForgotPassword", changeForgotPassword);

router.get("/validate", validateUser, async (req, res) => {
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
