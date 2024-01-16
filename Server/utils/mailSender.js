const nodemailer = require("nodemailer");
require('dotenv').config();

const mailSender = async (mailOptions) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail(mailOptions);

        return info;
    } catch (error) {
        console.log("Mail Error: ", error.message);
        return false;
    }
}

module.exports = mailSender;
