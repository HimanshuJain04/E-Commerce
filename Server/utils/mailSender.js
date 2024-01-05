const nodemailer = require("nodemailer");
require('dotenv').config()


exports.mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })


        let info = await transporter.sendMail({
            from: `"E-commerce" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        return info;
    }
    catch (error) {
        console.log("Mail Error : ", error.message);
        return false;
    }
}


