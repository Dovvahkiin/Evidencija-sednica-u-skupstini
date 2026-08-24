import dotenv from "dotenv";
import mysql from "mysql2/promise";
import chalk from "chalk";
import {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
} from "./serverConfig.js";
dotenv.config();

const DBTest = async () => {
  try {
    const [result] = await dbData.query("SELECT * from meetings");
    console.log(chalk.green("\nMySQL connected: \n"), result);
    console.log("\n");
  } catch (error) {
    console.error(chalk.red("\nMySQL connection failed: \n"), error);
  }
};

const dbData = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export { DBTest, dbData };
