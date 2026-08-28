const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { examReg, examOtp } = require("./controller/examController");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/reg", examReg);
app.post("/otp", examOtp);

mongoose
  .connect(
    "mongodb+srv://root:admin123@practice.4u2mmnp.mongodb.net/class08?appName=Practice",
  )
  .then(() => {
    console.log("Database Connected");
  });

app.listen(5000, () => {
  console.log("Server Connect");
});
