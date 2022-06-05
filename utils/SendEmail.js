const nodemailer = require('nodemailer');

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        type: "SMTP",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "alikonuk12@gmail.com",
            pass: "irexzzvwhyapavmm"
        }
    });

    const mailOptions = {
        from: 'OrfeCard <alikonuk12@gmail.com>',
        to: options.email,
        subject: options.subject,
        html: options.message
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;