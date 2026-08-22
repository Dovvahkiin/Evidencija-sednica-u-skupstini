require("dotenv").config("./.env");
import chalk from "chalk";

const app = require("./app.js");
const serverKonfiguracija = require("./konfiguracije/serverKonfiguracija");

app.listen(serverKonfiguracija.nodePort, () =>
  console.log(
    chalk.blue(
      `Example app listening on port ${serverKonfiguracija.nodePort}!`,
    ),
  ),
);
