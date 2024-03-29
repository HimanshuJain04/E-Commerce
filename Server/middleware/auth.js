const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.validateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.headers.authorization;

        if (!token) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Token is not Found",
                    error: "Token is not Found",
                }
            );
        }

        // verify the token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Token is not valid",
                    error: "Token is not valid",
                }
            );
        }
        req.user = decode;
        next();

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Token Verfication Failed",
                error: err.message,
            }
        );
    }
}