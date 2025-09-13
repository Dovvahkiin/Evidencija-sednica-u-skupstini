const express = require('express');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const serverKonfiguracija = require('./konfiguracije/serverKonfiguracija');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');


const app = express();

module.exports = app;