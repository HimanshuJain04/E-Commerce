const mailSender = require('./mailSender');
const { emailVerificationTemplate } = require('../templates/VerificationLink');
const { purchaseConfirmationTemplate } = require('../templates/purchasing');

exports.sendVerificationEmail = async (recipientEmail, verificationLink) => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: recipientEmail,
        subject: 'Verify Your Email',
        html: emailVerificationTemplate(verificationLink),
    };

    return await mailSender(mailOptions);
}

exports.sendPurchaseConfirmationEmail = async (recipientEmail, orderId) => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: recipientEmail,
        subject: 'Purchase Confirmation',
        html: purchaseConfirmationTemplate(orderId),
    };

    return await mailSender(mailOptions);
};
