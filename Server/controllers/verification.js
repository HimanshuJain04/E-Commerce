const Verification = require('../models/verification');
const bcrypt = require('bcrypt');
const User = require("../models/user");



exports.userVerification = async (req, res) => {
    try {

        const { userId, uniqueString } = req.params;

        console.log(userId);

        const user = await Verification.findOne({ userId: userId });

        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Account record doesn't exist or has been verified already,please login or signup ",
                }
            )
        }

        // get expiry time of link
        const { expiresIn } = user;


        // link expired
        if (expiresIn < Date.now()) {
            await Verification.deleteOne({ userId: userId });
            await User.deleteOne({ _id: userId });
        }

        const hashedString = user?.uniqueString;

        const result = bcrypt.compare(uniqueString, hashedString);

        // not verified user
        if (!result) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User is not verified,check your inbox again",
                }
            )
        }

        await User.findByIdAndUpdate(
            userId,
            {
                verified: true
            }
        );

        await Verification.deleteOne({ userId: userId });

        return res.status(200).json(
            {
                success: true,
                message: "User Verification Successfully",
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "User Verification Failed",
                err: err.message
            }
        )
    }
}