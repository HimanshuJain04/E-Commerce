const Coupon = require("../models/coupon");





exports.deleteCouponById = async (req, res) => {

    try {

        const { id } = req.params;

        const existedCoupon = await Coupon.findByIdAndDelete(id);

        if (existedCoupon) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Coupon not found",
                    error: "Coupon not found",
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "coupon delete successfully",
                data: {}
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "coupon delete failed",
                error: error.message
            }
        )
    }
}


exports.getAllCoupons = async (req, res) => {

    try {

        const allCoupons = await Coupon.find({});

        return res.status(200).json(
            {
                success: true,
                message: "Get all coupons successfully",
                data: allCoupons
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Get all coupons failed",
                error: error.message
            }
        )
    }
}


exports.createCoupon = async (req, res) => {

    try {

        const { code, discountType, discountAmount, minimumPurchaseAmount, expirationDate } = req.body;

        if (!code || !discountAmount || !discountType || !minimumPurchaseAmount || !expirationDate) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required",
                    error: "All fields are required",
                }
            )
        }

        const existedCoupon = await Coupon.findOne({ code });

        if (existedCoupon) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Coupon code is already in use, try another code",
                }
            )
        }

        const newCoupon = await Coupon.create(
            {
                code,
                discountAmount,
                discountType,
                minimumPurchaseAmount,
                expirationDate
            }
        );


        console.log("New Coupon : ", newCoupon);

        return res.status(200).json(
            {
                success: true,
                message: "coupon creation successfully",
                data: newCoupon
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "coupon creation failed",
                error: error.message
            }
        )
    }
}