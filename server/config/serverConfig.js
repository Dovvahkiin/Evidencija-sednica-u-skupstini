import dotenv from "dotenv";
dotenv.config();

export const NODE_PORT = process.env.NODE_PORT || 3000;
export const CLIENT_PORT = process.env.CLIENT_PORT || 5173;
export const ENV = process.env.NODE_ENV || "development";
export const FRONTEND_URL = process.env.FRONTEND_URL;

const productionOrigin = FRONTEND_URL;

export const serverConfig = {
  corsOptions: {
    origin:
      ENV === "production"
        ? [productionOrigin]
        : [`http://localhost:${CLIENT_PORT}`],
    methods: "POST,GET,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  },
};
