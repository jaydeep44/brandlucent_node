const express = require("express");
const {
  login,
  sendMailToResetPassword,
} = require("../controllers/loginControllers");

// const multer = require("multer");
const router = express.Router();

const { CreateUser } = require("../controllers/userController");

router.route("/createUser").post(CreateUser);
router.route("/login").post(login);
router.route("/sendMailtoRestPw").post(sendMailToResetPassword);
module.exports = router;
