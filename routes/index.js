const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
require("dotenv").config();
const user = require("./userRoutes");
const category = require("./categoryRoutes");
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use("/api", user);
app.use("/api", category);

module.exports = app;
