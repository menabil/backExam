const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "nabil1000cc@gmail.com",
    pass: "djedyweggmvenrbp",
  },
});

module.exports = transporter;
