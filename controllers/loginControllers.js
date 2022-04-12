const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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

exports.sendMailToResetPassword = (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,

    auth: { user: "jaydeepc721@gmail.com", pass: "Asus231#" },
  });

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User dont exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "jaydeepc721@gmail.com",
          subject: "password reset",
          html: `
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://192.168.168.28/react-projects/project2/set%20pass.jpg"/reset/${token}">link</a> to reset password</h5>
                    `,
        });
        res.json({ message: "check your email" });
      });
    });
  });
};
