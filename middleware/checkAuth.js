const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token, "token");
    const verify = jwt.verify(token, "thisisdummytext");
    console.log(verify);
    next();
  } catch {
    res.status(404).json({
      msg: "invalid Token",
    });
  }
};
