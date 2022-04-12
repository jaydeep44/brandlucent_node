var mongoose = require("mongoose");

const Category = mongoose.Schema({
  name: { type: String, required: [true, "please enter name"] },
  image: { type: String, required: [true, "please enter image"] },
});

var Cat = mongoose.model("Category", Category);
module.exports = Cat;
