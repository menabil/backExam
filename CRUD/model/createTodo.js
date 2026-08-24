const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const createTodo = new Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("majs", createTodo);
