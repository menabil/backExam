const express = require("express");
const { userReg, userLogin } = require("../controller/userController");

const router = express.Router();

router.post("/reg", userReg);
router.post("/login", userLogin);

module.exports = router;
