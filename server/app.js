const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const chalk = require("chalk");
const cookieParser = require("cookie-parser");

const serverKonfiguracija = require("./konfiguracije/serverKonfiguracija");
app.use(express.json());

const sednicaRuter = require("./rute/sednicaRute.js");
const dnevniRedRuter = require("./rute/dnevniRedRute.js");
const korisnikRuter = require("./rute/korisnikRute.js");
const autentikacijaRuter = require("./rute/autentikacioneRute.js");

app.use(cors(serverKonfiguracija.corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", sednicaRuter);
app.use("/", korisnikRuter);
app.use("/", dnevniRedRuter);
app.use("/", autentikacijaRuter);

module.exports = app;
