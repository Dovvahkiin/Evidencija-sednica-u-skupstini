const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const chalk = require("chalk");
const cookieParser = require("cookie-parser");

const serverKonfiguracija = require("./konfiguracije/serverKonfiguracija");
app.use(express.json());
const sednicaRuter = require("./rute/SednicaRute.js");
const dnevniRedRuter = require("./rute/dnevniRedRute.js");

app.use(cors(serverKonfiguracija.corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", sednicaRuter);
app.use("/", dnevniRedRuter);

module.exports = app;
