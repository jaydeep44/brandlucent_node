const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(400).json({
          message: "user name not found",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(400).json({
            message: "password is incorrect",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              _id: user[0]._id,
            },
            "thisisdummytext",
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            role: user[0].role,
            email: user[0].email,
            status: user[0].status,
            token: token,
          });
        }
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err,
      });
    });
};
