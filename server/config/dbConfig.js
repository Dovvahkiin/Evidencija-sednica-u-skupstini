import dotenv from "dotenv";
import mysql from "mysql2/promise";
import chalk from "chalk";
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
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export { DBTest, dbData };
