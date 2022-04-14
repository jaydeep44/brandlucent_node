const express = require("express");
const {
  saveOrder,
  getUserOrder,
  getAllOrders,
} = require("../controllers/orderControllers");
const router = express.Router();
const isverify = require("../middleware/checkAuth");

router.route("/saveOrder").post(isverify, saveOrder);
router.route("/getUserOrders/:id").get(isverify, getUserOrder);
router.route("/getAllOrders").get(isverify, getAllOrders);

module.exports = router;
