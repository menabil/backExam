const examModel = require("../model/examModel");
const otpGenerator = require("otp-generator");
const transporter = require("../utils/transporter");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const examReg = async (req, res) => {
  let { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(404).json({
      success: false,
      message: "Please fill all information",
    });
  }

  let userEmail = await examModel.findOne({ email: email });

  if (userEmail) {
    return res.status(404).json({
      success: false,
      message: "Already Exist This User",
    });
  }

  if (emailRegex.test(email) || passRegex.test(pass)) {
    return res.status(404).json({
      success: false,
      message: "Please give valid Information",
    });
  }

  let otp = otpGenerator.generate(6);

  try {
    const info = await transporter.sendMail({
      from: '"Example Team" <nabil1000cc@gmail.com>',
      to: email,
      subject: "Hello",
      text: "Hello world?",
      html: `This is Your OTP: ${otp}`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }

  let newUser = await new examModel({
    email: email,
    pass: pass,
    otp: otp,
  }).save();

  return res.status(201).json({
    success: true,
    message: "User Create & Otp Send",
  });
};

const examOtp = async (req, res) => {
  let { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Please fill all information",
    });
  }

  if (emailRegex.test(email)) {
    return res.status(404).json({
      success: false,
      message: "Please give valid Information",
    });
  }

  let exUser = await examModel.findOne({ email: email });

  if (!exUser) {
    return res.status(404).json({
      success: false,
      message: "This User is not Exist",
    });
  }

  if (otp !== exUser.otp) {
    let userDelete = await examModel.findOneAndDelete({ email: email });
    return res.status(400).json({
      success: false,
      message: "Delete Account",
    });
  }

  if (otp === exUser.otp) {
    let otpEmpty = await examModel.findOneAndUpdate(
      { email: email },
      { otp: "" },
    );
    return res.status(201).json({
      success: true,
      message: "Congratulation Login",
    });
  }
};

module.exports = { examReg, examOtp };
