require("dotenv").config();

const nodemailer = require("nodemailer");

function createRegistrationTemplate(link, message) {
    return `<h1>Verifycation link</h1><p>${message}: <a href=${link}>Click here</a><p/>`;
}

async function sendRegistrationMessage(link, message, toUser) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "kristian.petrov1998@gmail.com",
          pass: process.env.EMAIL_PASSWORD,
        },
    })

    const info = await transporter.sendMail({
        from: "kristian.petrov1998@gmail.com",
        to: toUser, 
        subject: "Registration in our Ecommerce shop",
        html: createRegistrationTemplate(link, message)

    });

    console.log("Message send:", info.messageId);
}

function sendInternalServerErrorMessage(res, error) {
    console.log(error.message);
    return res.status(501).json({error: "Internal server error!", success: false});
}

module.exports = {
    sendRegistrationMessage,
    sendInternalServerErrorMessage
}