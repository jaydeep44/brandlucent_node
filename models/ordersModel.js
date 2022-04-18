var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = mongoose.Schema({
  productId: { type: Schema.Types.ObjectId, ref: "product" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "pending" },
});

var Cat = mongoose.models.Order || mongoose.model("Orders", Order);
module.exports = Cat;
