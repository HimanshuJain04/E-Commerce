const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Verification = require('../models/verification');
const uuid = require('uuid').v4;
const { sendVerificationEmail, sendOTPEmail } = require("../utils/sendMail");
const Otp = require("../models/otp");


// Generate a random 5-digit OTP
function generateOTP() {
    const otp = Math.floor(10000 + Math.random() * 90000);
    return otp;
}


const sendVerificationEmailFun = async ({ _id, email }, res) => {

    try {
        // TODO : Get address from env file

        const clientUrl = "http://localhost:3000/";
        const uniqueString = uuid() + _id;

        const link = clientUrl + "auth/verify/" + uniqueString + "/" + _id;


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

        if (! await sendVerificationEmail(email, link)) {
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

        await sendVerificationEmailFun(data, res);

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
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // set cookie for 3 days
            httpOnly: true,
            secure: true,
            sameSite: 'None',
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


exports.userLogout = async (req, res) => {
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



exports.sendOTPForForgotPassword = async (req, res) => {
    try {
        // fetch the data from request
        const { email } = req.body;

        // validation
        if (!email) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields Required",
                    error: "All Fields Required",
                }
            )
        }

        // check email is already exist or not
        const existUser = await User.findOne({ email: email })


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

        const otp = generateOTP();

        // send the otp to the user email
        const emailRes = await sendOTPEmail(email, otp);

        if (!emailRes) {
            return res.status(500).json(
                {
                    success: false,
                    message: "Error while send email",
                }
            );
        }

        // store the otp in user db
        const otpRes = await Otp.create(
            {
                email,
                otp,
                expiredAt: Date.now() + 21600 * 1000
            }
        )

        if (!otpRes) {
            return res.status(500).json(
                {
                    success: false,
                    message: "Error while creating otp",
                }
            );
        }

        return res.status(200).json(
            {
                message: "Otp Send Successfully",
                data: otpRes.userId,
                success: true
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Otp for Forgot failed",
                error: err.message,
            }
        );
    }
}


exports.VerifyOtpForgotPassword = async (req, res) => {
    try {
        // fetch the data from request
        const { email, OTP } = req.body;


        // validation
        if (!email || !OTP) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields Required",
                    error: "All Fields Required",
                }
            )
        }

        // Find the OTP with the latest expiration time
        const latestOtp = await Otp.findOne({ email })
            .sort({ createdAt: -1 })
            .limit(1);


        if (!latestOtp) {
            return res.status(400).json({
                success: false,
                message: "No OTP found for the user",
                error: "No OTP found for the user",
            });
        }

        if (latestOtp.expiredAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Otp Expired,Try again",
                error: "Otp Expired,Try again",
            });
        }

        if (String(latestOtp.otp) !== OTP) {
            return res.status(400).json({
                success: false,
                message: "Otp doesn't match",
                error: "Otp doesn't match",
            });
        }

        return res.status(200).json(
            {
                message: "Otp Verfired successfully",
                data: {},
                success: true
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Otp Verfication failed",
                error: err.message,
            }
        );
    }
}


exports.changeForgotPassword = async (req, res) => {
    try {
        // fetch the data from request
        const { email, password, confirmPass } = req.body;


        // validation
        if (!email || !password || !confirmPass) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields Required",
                    error: "All Fields Required",
                }
            )
        }

        // validation
        if (password !== confirmPass) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Password and Confirm password must be same",
                    error: "Password and Confirm password must be same",
                }
            )
        }


        // Find the user
        const user = await User.findOne({ email });

        const hashedPass = await bcrypt.hash(password, 10);

        user.password = hashedPass;

        await user.save();


        return res.status(200).json(
            {
                message: "Password reset successfull",
                data: {},
                success: true
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Reset Password failed",
                error: err.message,
            }
        );
    }
}


