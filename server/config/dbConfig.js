import dotenv from "dotenv";
import mysql from "mysql2/promise";
import chalk from "chalk";
import {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
} from "./serverConfig";
dotenv.config();

const DBTest = () => {
  try {
    const [result] = dbData.query("SELECT 1");
    console.log(chalk.green("MySQL connected: \n", result));
  } catch (error) {
    console.error(chalk.red("MySQL connection failed: \n"), error);
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
