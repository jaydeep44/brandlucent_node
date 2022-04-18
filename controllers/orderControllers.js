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
  const status = req.query.status;
  if (!status && req.params.id) {
    const orders = await Order.find({ userId: req.params.id })
      .select("-userId")
      .populate([{ path: "productId" }])

      // .populate([{ path: "userId" }])

      .sort({ created_at: -1 })

      .then((result) => {
        if (result.length <= 0) {
          res.status(200).json({
            message: "we can't find orders from this user",
          });
        } else {
          res.status(200).send(result);
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } else if (status === "accept") {
    const orders = await Order.find({ status: status })
      .select("-userId")
      .populate([{ path: "productId" }])

      // .populate([{ path: "userId" }])

      .sort({ created_at: -1 })

      .then((result) => {
        if (result.length <= 0) {
          res.status(200).json({
            message: "There is no accepted orders",
          });
        } else {
          res.status(200).send(result);
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } else if (status === "close") {
    const orders = await Order.find({ status: status })
      .select("-userId")
      .populate([{ path: "productId" }])

      // .populate([{ path: "userId" }])

      .sort({ created_at: -1 })

      .then((result) => {
        if (result.length <= 0) {
          res.status(200).json({
            message: "There is no closed orders",
          });
        } else {
          res.status(200).send(result);
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
    //  block of code to be executed if the condition1 is false and condition2 is false
  } else {
    const orders = await Order.find()
      .populate([{ path: "productId" }])

      .sort({ created_at: -1 })

      .then((result) => {
        if (result.length <= 0) {
          res.status(200).json({
            message: "we don't have any orders",
          });
        } else {
          res.status(200).send(result);
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }
};

// exports.getAllOrders = async (req, res) => {
//   const orders = await Order.find()
//     .populate([{ path: "productId" }])

//     .sort({ created_at: -1 })

//     .then((result) => {
//       res.status(200).send(result);
//     })
//     .catch((err) => {
//       res.status(400).send({ message: err.message });
//     });
// };

exports.Update_Order_Status = (req, res) => {
  if (req.params.id) {
    Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true },
      (err, orderStatusData) => {
        if (err) {
          res.status(404).json({
            message: "please enter correct order id ",
            subErr: err.message,
          });
        } else {
          res.status(200).json({
            updated_user: "Order status Update successfully",
            orderStatusUpdated: orderStatusData,
          });
        }
      }
    );
  } else {
    res.status(200).json({
      updated_user: "order id is required to update status",
      orderStatusUpdated: orderStatusData,
    });
  }
};
