const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Verification = require('../models/verification');
const uuid = require('uuid').v4;
const { mailSender } = require("../utils/mailSender");

const sendVerificationEmail = async ({ _id, email }, res) => {

    try {
        // TODO : Get address from env file

        const clientUrl = "http://localhost:3000/";
        const uniqueString = uuid() + _id;

        const subject = "Verify Your Email";
        const htmlBody = `<p>Verify your email to complete signup.<b>This link expires in 6 hour. </b></p>
        <p> click <a href=${clientUrl + "auth/verify/" + uniqueString + "/" + _id}>here</a> to proceed.</p>`


        // hash the uniqueString and save them into database
        const hashedString = await bcrypt.hash(uniqueString, 10);


        await Verification.create(
            {
                userId: _id,
                uniqueString: hashedString,
                createdAt: Date.now(),
                expiresIn: Date.now() + 21600000, //6 hour
            }
        );

        if (! await mailSender(email, subject, htmlBody)) {
            return false;
        }

        return true;

    } catch (err) {
        return false;
    }
}

exports.userSignup = async (req, res) => {
    try {

        // fetch the data from request
        const { name, email, password, gender, confirmPass, phoneNo } = req.body;

        // validation
        if (!name || !email || !password || !gender || !confirmPass || !phoneNo) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields Required",
                    error: "All Fields Required",
                }
            )
        }

        if (password !== confirmPass) {
            return res.status(400).json(
                {
                    success: false,
                    message: "password and confirm password must be the same",
                    error: "password and confirm password must be the same",
                }
            )
        }

        // check email is already exist or not
        const existUser = await User.findOne({ email: email });
        if (existUser) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email already registered,please login",
                    error: "Email already registered,please login",
                }
            )
        }

        // hashed the password
        const hashedPass = await bcrypt.hash(password, 15);

        // create entry in database
        const data = await User.create(
            {
                name: name,
                email: email,
                password: hashedPass,
                phoneNo: phoneNo,
                gender: gender,
                verified: false,
                profileImg: `https://api.dicebear.com/6.x/initials/svg?seed=${name} &backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`
            }
        )

        await sendVerificationEmail(data, res);

        return res.status(200).json(
            {
                success: true,
                message: "SignUp Successfully",
                data: data,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "SignUp Failed",
                error: err.message,
            }
        );
    }
}


exports.userLogin = async (req, res) => {
    try {
        // fetch the data from request
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields Required",
                    error: "All Fields Required",
                }
            )
        }

        // check email is already exist or not
        const existUser = await User.findOne({ email: email });
        if (!existUser) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email not registered,please signup",
                    error: "Email not registered,please signup",
                }
            )
        }

        if (!existUser.verified) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Verify your email",
                    error: "Verify your email",
                }
            );
        }



        // compare the password
        const comparePass = await bcrypt.compare(password, existUser.password);
        if (!comparePass) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Password doesn't match",
                    error: "Password doesn't match",
                }
            )
        }

        // create jwt token and store that into cookie and localStorage
        const token = jwt.sign(
            { email: existUser.email, id: existUser._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );

        existUser.token = token;

        // Set cookie for token and return success response
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // set cookie for 3 day
            httpOnly: true,
        };

        // send cookie
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            existUser,
            message: "User Login Success",
        });


    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Login Failed",
                error: err,
            }
        );
    }
}

