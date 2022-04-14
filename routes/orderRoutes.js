const express = require("express");
const {
  saveOrder,
  getUserOrder,
  getAllOrders,
} = require("../controllers/orderControllers");
const router = express.Router();

router.route("/saveOrder").post(saveOrder);
router.route("/getUserOrders/:id").get(getUserOrder);
router.route("/getAllOrders").get(getAllOrders);

module.exports = router;
