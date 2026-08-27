require("node:dns").setServers(["1.1.1.1"], ["8.8.8.8"]);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  regController,
  otpController,
  loginController,
  logoutController,
} = require("./controller/authController");
const { logLimiter } = require("./utils/limiter");
const {
  createUser,
  readUser,
  deleteUser,
  updateUser,
} = require("./controller/crudController");

const app = express();
app.use(express.json());
app.use(cors());
app.use(logLimiter);

app.post("/reg", regController);
app.post("/otp", logLimiter, otpController);
app.post("/login", logLimiter, loginController);
app.post("/logout", logoutController);
app.post("/login", createUser);
app.get("/alldata", readUser);
app.delete("/delete/:id", deleteUser);
app.post("/update/:id", updateUser);

mongoose
  .connect(
    "mongodb+srv://root:admin123@practice.4u2mmnp.mongodb.net/class08?appName=Practice",
  )
  .then(() => {
    console.log("Database Connected");
  });

app.listen("5000", async (req, res) => {
  console.log("Server is Running");
});
