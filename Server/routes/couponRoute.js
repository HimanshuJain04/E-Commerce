const express = require('express');
const router = express.Router();

const
    {
        createCoupon
    }
        = require("../controllers/coupon");

router.get("/getAllCoupon",);

router.delete("/deleteCouponById",);

router.post("/createCoupon", createCoupon);

module.exports = router;

