const Category = require("../models/categoryModel");
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

exports.create_Category = async (req, res) => {
  let imagePath = "";
  if (req.file) {
    imagePath = req.file.path;
  }
  const catsave = new Category({
    name: req.body.name,
    image: imagePath,
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

exports.DeleteCategory = async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(500).json({
      success: false,
      message: "category was not found",
    });
  }
  try {
    await category.remove();
    res.status(201).json({
      success: true,
      message: "category deleted",
    });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
};
exports.Get_Category = async (req, res) => {
  const data = await Category.find()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.updateCategory = (req, res) => {
  var image = req.file.path;

  console.log(req.body, "image");
  Category.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      image: image,
    }
  )
    .then((result) => {
      res.status(200).json({
        updated_user: "Category Updated successfully",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};
