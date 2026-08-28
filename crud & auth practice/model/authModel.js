const mongoose = require("mongoose");
const { Schema } = mongoose;

const regModel = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  pass: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    default: "",
  },
  isLogin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("majs", regModel);
