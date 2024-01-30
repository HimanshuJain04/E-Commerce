const express = require('express');
const router = express.Router();

const
    {
        createCoupon,
        deleteCouponById
    }
        = require("../controllers/coupon");



router.get("/getAllCoupon",);

router.delete("/deleteCouponById/:id", deleteCouponById);

router.post("/createCoupon", createCoupon);

module.exports = router;

