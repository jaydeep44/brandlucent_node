const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
require("dotenv").config();
const user = require("./userRoutes");
const category = require("./categoryRoutes");
const header = require("./headerRoutes");
const footer = require("./footerRoutes");
const banner = require("./bannerRoutes")

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
app.use("/api", user);
app.use("/api", category);
app.use('/api', header);
app.use('/api', footer);
app.use('/api',banner)
module.exports = app;
