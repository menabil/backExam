const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/userRoute");
const app = express();

mongoose
  .connect(
    "mongodb+srv://root:admin123@practice.4u2mmnp.mongodb.net/class08?appName=Practice",
  )
  .then(() => {
    console.log("Database Connected");
  });

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(5000, () => {
  console.log("Server is running");
});
