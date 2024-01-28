const mongoose = require('mongoose');

const browserSchema = new mongoose.Schema(
    {
        browserFamily: String,
        browserMajorVersion: String,
        browserMinorVersion: String,
        browserPatchVersion: String,
        userAgent: String,
    },
    { timestamps: true }
);

const Browser = mongoose.model('Browser', browserSchema);

module.exports = Browser;