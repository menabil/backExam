const userModel = require("../model/userModel");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const strongPasswordRegex =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const userReg = async (req, res) => {
  let { email, pass } = req.body;

  if (!email || !pass) {
    return res.json({
      success: false,
      message: "Please fill all information",
    });
  }

  let exUser = await userModel.findOne({ email: email });

  if (exUser) {
    return res.json({
      success: false,
      message: "User already exist",
    });
  }

  if (!emailRegex.test(email)) {
    return res.json({
      success: false,
      message: "Please Give valid Email",
    });
  }

  if (!strongPasswordRegex.test(pass)) {
    return res.json({
      success: false,
      message: "Please Give valid Password",
    });
  }

  let otp = otpGenerator.generate(6);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "nabil1000cc@gmail.com",
      pass: "hvxvmmfuzyolbvku",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: "nabil1000cc@gmail.com",
      to: email,
      subject: "OTP",
      text: "Hello world?",
      html: `This is you OTP: ${otp}`,
    });
  } catch (err) {
    console.error("Error while sending mail:", err);
  }

  let newUser = await new userModel({
    email: email,
    pass: pass,
    otp: otp,
  }).save();

  return res.json({
    success: true,
    message: "User Otp send",
  });
};

const userLogin = async (req, res) => {
  let { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({
      success: false,
      message: "Please fill all information",
    });
  }

  let exUser = await userModel.findOne({ email: email });

  if (!exUser) {
    return res.json({
      success: false,
      message: "User not found",
    });
  }

  if (otp !== exUser.otp) {
    let deleteUser = await userModel.findOneAndDelete({ email });

    return res.json({
      success: false,
      message: "OTP not matched try again",
    });
  }

  if (otp == exUser.otp) {
    let otpFaka = await userModel.findOneAndUpdate(
      { email: email },
      { otp: "" },
    );

    return res.json({
      success: true,
      message: "Registration Successful",
    });
  }
};

module.exports = { userReg, userLogin };
