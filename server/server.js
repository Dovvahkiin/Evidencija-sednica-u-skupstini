import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

import { NODE_PORT } from "./config/serverConfig.js";
import app from "./app.js";

app.listen(NODE_PORT, () =>
  console.log(chalk.blue(`\nServer is started on port: ${NODE_PORT}!\n`)),
);
