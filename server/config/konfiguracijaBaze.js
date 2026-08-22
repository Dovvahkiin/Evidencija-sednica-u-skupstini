const mysql = require("mysql2/promise");

const podaciBaze = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_KORISNIK,
  password: process.env.DB_LOZINKA,
  database: process.env.DB_BAZA,
  port: process.env.DB_PORT,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = podaciBaze;
