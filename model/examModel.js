const mongoose = require("mongoose");
const { Schema } = mongoose;

const examModel = new Schema({
  email: {
    type: String,
  },
  pass: {
    type: String,
  },
  otp: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("majs", examModel);
