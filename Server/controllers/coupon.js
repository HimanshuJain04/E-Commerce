

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