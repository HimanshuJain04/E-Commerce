const mailSender = require('./mailSender');
const { emailVerificationTemplate } = require('../templates/VerificationLink');
const { emailOtpTemplate } = require('../templates/otp');
const { purchaseConfirmationTemplate } = require('../templates/purchasing');

exports.sendVerificationEmail = async (recipientEmail, verificationLink) => {
    const mailOptions = {
        from: `E-Commerce <${process.env.MAIL_USER}>`,
        to: recipientEmail,
        subject: 'Verify Your Email',
        html: emailVerificationTemplate(verificationLink),
    };

    return await mailSender(mailOptions);
}

exports.sendOTPEmail = async (recipientEmail, otp) => {
    const mailOptions = {
        from: `E-Commerce <${process.env.MAIL_USER}>`,
        to: recipientEmail,
        subject: 'OTP',
        html: emailOtpTemplate(otp),
    };

    return await mailSender(mailOptions);
}

exports.sendPurchaseConfirmationEmail = async (recipientEmail, orderId) => {
    const mailOptions = {
        from: `E-Commerce <${process.env.MAIL_USER}>`,
        to: recipientEmail,
        subject: 'Purchase Confirmation',
        html: purchaseConfirmationTemplate(orderId),
    };

    return await mailSender(mailOptions);
};


