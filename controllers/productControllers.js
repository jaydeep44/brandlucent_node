const Product = require("../models/productModel");
const multer = require("multer");
const { mongoose } = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
exports.upload = multer({ storage: storage });

exports.product_create = async (req, res) => {
  //   if (Object.keys(body).length === 0 && body.constructor === Object) {
  //     res.status(400).send({ message: "data not proper formated..." });
  //   }
  // console.log("body = ", body)
  console.log(req.file);
  let imagePath = "";
  if (req.file) {
    imagePath = req.file.path;
  }
  const catsave = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    image: imagePath,
    price: req.body.price,
    quantity: req.body.quantity,
    cat_id: req.body.cat_id,
  });
  await catsave
    .save()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.Get_All_Product = async (req, res) => {
  await Product.find()
    .populate([{ path: "cat_id" }])

    .sort({ created_at: -1 })

    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.Delete_product = async (req, res) => {
  let Products = await Product.findById(req.params.id);
  console.log(Products, "Products");
  if (!Products) {
    return res.status(500).json({
      success: false,
      message: "Product was not found",
    });
  }
  try {
    await Products.remove();
    res.status(201).json({
      success: true,
      message: "Product deleted",
    });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
};

exports.Update_Product = (req, res) => {
  var image = req.file.path;
  const product = req.body;
  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      description: req.body.description,
      image: image,
      price: req.body.price,
      quantity: req.body.quantity,
      cat_id: req.body.cat_id,
    }
  )
    .then((result) => {
      res.status(200).json({
        updated_user: "Product Updated successfully",
        product,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "please enter correct product id ",
      });
    });
};
