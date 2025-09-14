const express = require('express');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const serverKonfiguracija = require('./konfiguracije/serverKonfiguracija');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const kvorum = require("./poslovnaPravila/kvorum.js");

const app = express();

/* testing 

app.get("/", (req,res)=>
{
    res.send(kvorum);
}) */

module.exports = app;