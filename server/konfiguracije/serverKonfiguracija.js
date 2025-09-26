const nodePort = process.env.NODE_PORT;
const klijentPort = process.env.KLIJENT_PORT;

module.exports = {
  nodePort,
  klijentPort,
  corsOptions: {
    origin: [`http://localhost:${klijentPort}`],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
};
