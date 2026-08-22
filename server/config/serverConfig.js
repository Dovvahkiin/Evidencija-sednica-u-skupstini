import dotenv from "dotenv";
dotenv.config();

export const nodePort = process.env.NODE_PORT;
export const clientPort = process.env.KLIJENT_PORT;

export const serverConfig = {
  corsOptions: {
    origin: [`http://localhost:${clientPort}`],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
};
