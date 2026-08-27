const majs = require("../model/authModel");
const bcrypt = require("bcrypt");
const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passValid =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const transporter = require("../utils/transporter");
// Registration
const regController = async (req, res) => {
  let { email, pass, conPass } = req.body;
  if (!email || !pass || !conPass) {
    return res.send({
      success: false,
      message: "Please fill all box",
    });
  }

  let exUser = await majs.findOne({ email: email });

  if (exUser) {
    return res.send({
      success: false,
      message: "User already exist",
    });
  }

  if (!emailValid.test(email)) {
    return res.send({
      success: false,
      message: "Please Use a Valid Email",
    });
  }

  if (!passValid.test(pass)) {
    return res.send({
      success: false,
      message: "Please Use a Valid Pass",
    });
  }

  if (pass !== conPass) {
    return res.send({
      success: false,
      message: "Password not matched",
    });
  }

  const hash = bcrypt.hashSync(pass, 10);

  const newUser = new majs({
    email: email,
    pass: hash,
  }).save();

  return res.send({
    success: true,
    message: "Registration Successful",
  });
};
// Send OTP
const otpController = async (req, res) => {
  let { email, pass } = req.body;

  if (!email || !pass) {
    res.send({
      success: false,
      message: "Please give all information",
    });
  }

  const exUser = await majs.findOne({ email: email });

  if (!exUser) {
    res.send({
      success: false,
      message: "User not found",
    });
  }

  let exPass = await bcrypt.compareSync(pass, exUser.pass);

  if (!exPass) {
    res.send({
      success: false,
      message: "Invalid Pass",
    });
  }

  let otp = otpGenerator.generate(6);

  await majs.findOneAndUpdate({ email: email }, { otp: otp });

  const info = await transporter.sendMail({
    from: '"Example Team" <nabil1000cc@gmail.com>',
    to: email,
    subject: "OTP",
    html: `Hello, This is your otp : ${otp}`,
  });

  res.send({
    success: true,
    message: "Otp send successfully",
  });
};
// Login
const loginController = async (req, res) => {
  let { email, otp } = req.body;

  if (!email || !otp) {
    return res.send({
      success: false,
      message: "Please fill all filed",
    });
  }

  let exUser = await majs.findOne({ email: email });

  if (!exUser) {
    return res.send({
      success: false,
      message: "User not found",
    });
  }

  if (exUser.isLogin) {
    return res.send({
      success: false,
      message: "Already login",
    });
  }

  if (!exUser.otp || exUser.otp === "") {
    return res.send({
      success: false,
      message: "OTP expired",
    });
  }

  if (exUser.otp === otp) {
    await majs.findOneAndUpdate({ email: email }, { otp: "", isLogin: true });
  }
  return res.send({
    success: true,
    message: "Login Done",
  });
};

// Logout
const logoutController = async (req, res) => {
  let { email } = req.body;

  if (!email) {
    return res.send({
      success: false,
      message: "Please give ur email",
    });
  }
  let exUser = await majs.findOne({ email: email });

  if (!exUser.isLogin) {
    res.send({
      success: false,
      message: "User already logout",
    });
  }

  await majs.findOneAndUpdate({ email: email }, { isLogin: false });

  res.send({
    success: true,
    message: "Logout Done",
  });
};

module.exports = {
  regController,
  otpController,
  loginController,
  logoutController,
};
