const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnection = async () => {

    mongoose.connect(process.env.MONGODB_URL, {}).
        then(() => {
            console.log("Database connection established");
        }).catch(err => {
            console.log("Database connection error: " + err);
            process.exit(1);
        });
}