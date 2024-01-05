const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema(
    {
        uniqueString: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        createdAt: {
            type: Date,
        },
        expiresIn: {
            type: Date,
        }
    }
);

module.exports = mongoose.model("Verification", verificationSchema);