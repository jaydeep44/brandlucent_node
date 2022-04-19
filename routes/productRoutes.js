const express = require("express");
const {
  upload,
  Get_All_Product,
  Delete_product,
  Update_Product,
  Get_product_by_category,
  visitedProductNumberOfTime
} = require("../controllers/productControllers");
const { product_create } = require("../controllers/productControllers");

const router = express.Router();

router.route("/createProduct").post(upload.single("image"), product_create);
router.route("/getProducts").get(Get_All_Product);
router.route("/deleteProduct/:id").delete(Delete_product);
router.route("/updateProduct/:id").put(upload.single("image"), Update_Product);
router
  .route("/getProductBycategory/:id")
  .get(upload.none(), Get_product_by_category);

router.route("/addvisit").post(visitedProductNumberOfTime);
module.exports = router;

