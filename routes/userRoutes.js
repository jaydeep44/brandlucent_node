const express = require("express");
const { login } = require("../controllers/loginControllers");
const router = express.Router();

const userController = require("../controllers/userController");


router.route("/login").post(login);
router.route("/createUser").post(userController.CreateUser);
router.route("/updateUser").post(userController.updateUser);
router.route("/getUsers").get(userController.getAllUser);
router.route("/deleteUser").delete(userController.deleteUser);
module.exports = router;
