const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.Auth = async (req, res, next) => {
    try {
        const token = req.cookies.userToken || req.body.userToken || req.headers.authorization;

        if (!token) {
            return res.status(400).json(
                {
                    status: false,
                    message: "Token is not Found",
                }
            );
        }

        // verify the token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(400).json(
                {
                    status: false,
                    message: "Token is not valid",
                }
            );
        }
        req.user = decode;
        next();

    } catch (err) {
        return res.status(500).json(
            {
                status: false,
                message: "Token Verfication Failed",
                error: err.message,
            }
        );
    }
}