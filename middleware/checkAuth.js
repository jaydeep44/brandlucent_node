const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  var dateNow = new Date();

  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const verify = jwt.verify(token, "thisisdummytext");
      console.log(verify);
      next();
    } catch {
      res.status(404).json({
        msg: "invalid Token",
      });
    }
  } else {
    res.status(404).json({
      msg: "Token is required",
    });
  }
};
