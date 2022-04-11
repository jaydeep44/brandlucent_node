const express = require("express");
require("dotenv").config();
const DatabaseConn = require("./conn");
const app = express();

DatabaseConn();

const port = process.env.PORT || "5000";
app.listen(port, () => {
  console.log(`server is running on port${port}`);
});
