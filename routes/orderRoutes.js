const express = require("express");
const {
  saveOrder,
  getUserOrder,
  getAllOrders,
  getBestSelling,
  getpopularProduct
} = require("../controllers/orderControllers");
const router = express.Router();

const isverify = require('../middleware/checkAuth')

router.route("/saveOrder").post(saveOrder);
router.route("/getUserOrders/:id").get(getUserOrder);
router.route("/getAllOrders").get(getAllOrders);
router.route("/getBestselling").get(isverify,getBestSelling),
router.route("/getPopular").get(isverify,getpopularProduct),


module.exports = router;
