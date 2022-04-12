const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
require("dotenv").config();
const user = require("./userRoutes");
<<<<<<< HEAD
const category = require("./categoryRoutes");
=======

>>>>>>> 5485ffd552733659c7484194e8b3d52a51185632
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use("/api", user);
app.use("/api", category);

module.exports = app;
