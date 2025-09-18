const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const serverKonfiguracija = require("./konfiguracije/serverKonfiguracija");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const kvorumOsvezi = require("./poslovnaPravila/izracunavanjeKvoruma.js");

const app = express();

kvorumOsvezi();

/* testing 

app.get("/", (req,res)=>
{
    res.send(kvorum);
}) */

module.exports = app;
