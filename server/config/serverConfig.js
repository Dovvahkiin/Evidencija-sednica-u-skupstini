import dotenv from "dotenv";
dotenv.config();

export const NODE_PORT = process.env.NODE_PORT || 3000;
export const CLIENT_PORT = process.env.CLIENT_PORT || 5173;
export const ENV = process.env.NODE_ENV || "development";
export const FRONTEND_URL = process.env.FRONTEND_URL;

export const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = process.env.DB_PORT;

export const serverConfig = {
  corsOptions: {
    origin:
      ENV === "production"
        ? [FRONTEND_URL]
        : [`http://localhost:${CLIENT_PORT}`],
    methods: "POST,GET,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  },
};
