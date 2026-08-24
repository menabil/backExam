const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  createUser,
  readUser,
  deleteUser,
  updateUser,
} = require("./controller/authController");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://root:admin123@practice.4u2mmnp.mongodb.net/class08?appName=Practice",
  )
  .then(() => {
    console.log("Database Connected");
  });

app.post("/login", createUser);
app.get("/alldata", readUser);
app.delete("/delete/:id", deleteUser);
app.post("/update/:id", updateUser);

app.listen("5000", (req, res) => {
  console.log("Server Connected");
});
