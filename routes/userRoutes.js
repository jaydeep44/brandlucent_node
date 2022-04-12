const express = require("express");
const {
  login,
  sendMailToResetPassword,
  restPassword,
} = require("../controllers/loginControllers");
<<<<<<< HEAD
const middleware = require("../middleware/checkAuth");
// const multer = require("multer");
=======
const isverify = require("../middleware/checkAuth")
>>>>>>> 5485ffd552733659c7484194e8b3d52a51185632
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/login").post(login);
router.route("/createUser").post(userController.CreateUser);
<<<<<<< HEAD
router.route("/updateUser").post(userController.updateUser);
router.route("/getUsers").get(middleware, userController.getAllUser);
router.route("/deleteUser").delete(userController.deleteUser);
router.route("/sendMailtoRestPw").post(sendMailToResetPassword);
router.route("/resetPassword").post(restPassword);
=======
router.route("/updateUser").post(isverify,userController.updateUser);
router.route("/getUsers").get(isverify,userController.getAllUser);
router.route("/deleteUser").delete(isverify,userController.deleteUser);
router.route("/sendMailtoRestPw").post(sendMailToResetPassword);
router.route("/getUser").get(isverify,userController.getUserById);
>>>>>>> 5485ffd552733659c7484194e8b3d52a51185632
module.exports = router;
