const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.CreateUser = (req, res) => {
  const body = req.body;
  // if (Object.keys(body).length === 0 && body.constructor === Object) {
  //   res.status(400).send({ message: "Data Not Proper Formated..." });
  // }
  const newUser = new User(body);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newUser.password, salt);
  newUser.password = hash;
  newUser
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({
        message: "please Insert Unique Data",
        SubError: err.message,
      });
    });
};
