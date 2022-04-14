const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
require("dotenv").config();
const user = require("./userRoutes");
const category = require("./categoryRoutes");
const product = require("./productRoutes");
const Offers = require("./productOfferRoutes");
const Order = require("../routes/orderRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use("/api", user);
app.use("/api", category);
app.use("/api", product);
app.use("/api", Offers);
app.use("/api", Order);

module.exports = app;
