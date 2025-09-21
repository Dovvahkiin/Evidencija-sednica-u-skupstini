const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const chalk = require("chalk");
const cookieParser = require("cookie-parser");

const serverKonfiguracija = require("./konfiguracije/serverKonfiguracija");
const { kvorumOsvezi } = require("./poslovnaPravila/izracunavanjeKvoruma.js");

app.use(express.json());
const sednicaRuter = require("./rute/SednicaRute.js");
const dnevniRedRuter = require("./rute/dnevniRedRute.js");

app.use(cors(serverKonfiguracija.corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
kvorumOsvezi(); // osvezavanje kvoruma na osnovu unetog ukupnog broja clanova u json

app.use("/", sednicaRuter);
app.use("/", dnevniRedRuter);

module.exports = app;
