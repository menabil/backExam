const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "nabil1000cc@gmail.com",
    pass: "sifclasgekcgooyn",
  },
});

module.exports = transporter;
