require("dotenv").config("./.env");
const chalk = require("chalk");
const express = require('express');

const app = require("./app.js");
const serverKonfiguracija = require('./konfiguracije/serverKonfiguracija');

app.listen(serverKonfiguracija.nodePort, () => 
    console.log(chalk.blue(`Example app listening on port ${serverKonfiguracija.nodePort}!`)));