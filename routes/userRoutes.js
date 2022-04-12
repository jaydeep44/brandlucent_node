const express = require("express");
const {
  login,
  sendMailToResetPassword,
} = require("../controllers/loginControllers");

// const multer = require("multer");
const router = express.Router();

const userController = require("../controllers/userController");


router.route("/login").post(login);
router.route("/createUser").post(userController.CreateUser);
router.route("/updateUser").post(userController.updateUser);
router.route("/getUsers").get(userController.getAllUser);
router.route("/deleteUser").delete(userController.deleteUser);
router.route("/sendMailtoRestPw").post(sendMailToResetPassword);
module.exports = router;
