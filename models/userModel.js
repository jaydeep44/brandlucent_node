const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var User = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, maxLength: 9 },
  password: { type: String, required: true },
  role: { type: Boolean, default: 0 },
});

var user = mongoose.model("UserDetails", User);
module.exports = user;
