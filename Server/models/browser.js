const mongoose = require('mongoose');

const browserSchema = new mongoose.Schema({
    browserFamily: String,
    browserMajorVersion: String,
    browserMinorVersion: String,
    browserPatchVersion: String,
    userAgent: String,
});

const Browser = mongoose.model('Browser', browserSchema);

module.exports = Browser;