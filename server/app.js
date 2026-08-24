import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { serverConfig } from "./config/serverConfig.js";
import dotenv from "dotenv";
import { DBTest } from "./config/dbConfig.js";
dotenv.config();
import centralizedRouter from "./routes/index.js";

const app = express();

app.use(helmet());

app.use(cors(serverConfig.corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

await DBTest();
centralizedRouter(app);

export default app;
