const express = require("express");
const { create_Category } = require("../controllers/categoryController");

const router = express.Router();

router.route("/createCategory").post(create_Category);
module.exports = router;
