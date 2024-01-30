// Importing necessary modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Coupon schema
const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed', 'free_shipping', 'BOGO'],
        required: true
    },
    discountAmount: {
        type: Number,
        required: true
    },
    minimumPurchaseAmount: {
        type: Number,
        default: 0
    },
    expirationDate: {
        type: Date,
        required: true
    },  
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Coupon model
const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
