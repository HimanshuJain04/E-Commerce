const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
    {
        otp: {
            type: Number
        },
        email: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        expiredAt: {
            type: Date
        }
    }
);

module.exports = mongoose.model("Otp", otpSchema);

