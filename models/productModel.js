var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = mongoose.Schema({
  name: { type: String, required: [true, "please enter name"] },
  image: { type: String, required: [true, "please enter image"] },
  description: { type: String, required: [true, "please enter description"] },
  price: { type: Number, required: [true, "please enter price"] },
  quantity: { type: Number, required: [true, "please enter quantity"] },
  cat_id: {
    type: Schema.Types.ObjectId,
    ref: "Categorys",
    required: true,
  },
});

var product = mongoose.model("product", products);
module.exports = product;
