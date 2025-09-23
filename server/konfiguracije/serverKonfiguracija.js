require("dotenv").config();

const nodePort = process.env.NODE_PORT;
const klijentPort = process.env.KLIJENT_PORT;

module.exports = {
  nodePort,
  klijentPort,
  corsOptions: {
    origin: ["http://localhost:5173"],
    method: ["GET", "POST"],
    credentials: true,
  },
};
