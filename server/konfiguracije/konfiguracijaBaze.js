const mysql = require("mysql2/promise");

const process = process.env;

const podaciBaze = mysql.createPool({
  host: process.DB_HOST,
  user: process.DB_KORISNIK,
  password: process.DB_LOZINKA,
  database: process.DB_BAZA,
  port: process.DB_PORT,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = podaciBaze;
