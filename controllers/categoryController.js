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
  //   if (Object.keys(body).length === 0 && body.constructor === Object) {
  //     res.status(400).send({ message: "data not proper formated..." });
  //   }
  // console.log("body = ", body)
  console.log(req.file);
  let imagePath = "";
  if (req.file) {
    imagePath = req.file.path;
  }
  const catsave = new Category({
    _id: mongoose.Types.ObjectId(),
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
