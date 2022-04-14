const Order = require("../models/ordersModel");

exports.saveOrder = async (req, res) => {
  const orderSave = new Order({
    productId: req.body.productId,
    userId: req.body.userId,
  });
  await orderSave
    .save()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.getUserOrder = async (req, res) => {
  const orders = await Order.find({ userId: req.params.id })
    .select("-userId")
    .populate([{ path: "productId" }])

    // .populate([{ path: "userId" }])

    .sort({ created_at: -1 })

    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate([{ path: "productId" }])

    .sort({ created_at: -1 })

    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
