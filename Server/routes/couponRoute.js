const express = require('express');
const router = express.Router();

const
    {
        createCoupon,
        deleteCouponById,
        getAllCoupons
    }
        = require("../controllers/coupon");



router.get("/getAllCoupons", getAllCoupons);

router.delete("/deleteCouponById/:id", deleteCouponById);

router.post("/createCoupon", createCoupon);

module.exports = router;

