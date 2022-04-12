const express = require("express");
const {
  create_Category,
  upload,
  DeleteCategory,
  Get_Category,
  updateCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/createCategory").post(upload.single("image"), create_Category);
router.route("/deleteCategory/:id").delete(DeleteCategory);
router.route("/getCategory").get(Get_Category);
router.route("/updateCategory/:id").put(upload.single("image"), updateCategory);

module.exports = router;
