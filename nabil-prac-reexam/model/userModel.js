const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema({
  email: {
    type: String,
    unique: true,
  },
  pass: {
    type: String,
  },
  otp: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("prepration", userModel);
