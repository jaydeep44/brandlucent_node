const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();

app.use(express.json());

app.use(cors());

// app.use(bodyParser.json()); // to support JSON-encoded bodies
// app.use(
//   bodyParser.urlencoded({
//     // to support URL-encoded bodies
//     extended: true,
//   })
// );

app.use(express.json());
const user = require("./routes/userRoutes");

app.use("/api", user), (module.exports = app);
