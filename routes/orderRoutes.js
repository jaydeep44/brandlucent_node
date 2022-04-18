const express = require("express");
const {
  saveOrder,
  getUserOrder,
  Update_Order_Status,
} = require("../controllers/orderControllers");
const router = express.Router();
const isverify = require("../middleware/checkAuth");

router.route("/saveOrder").post(saveOrder);
router.route("/getOrders/:id?").get(getUserOrder);
// router.route("/getAllOrders").get(getAllOrders);
router.route("/updateStatus/:id").put(Update_Order_Status);

module.exports = router;
