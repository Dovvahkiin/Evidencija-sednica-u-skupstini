import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { serverConfig } from "./config/serverConfig.js";
import dotenv from "dotenv";
// import { DBTest } from "./config/dbConfig.js"; line 29
dotenv.config();

/*
const sednicaRuter = require("./rute/sednicaRute.js");
const dnevniRedRuter = require("./rute/dnevniRedRute.js");
const korisnikRuter = require("./rute/korisnikRute.js");
const autentikacijaRuter = require("./rute/autentikacioneRute.js");
*/

const app = express();

app.use(helmet());

app.use(cors(serverConfig.corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// DBTest(); - uncomment after adding database to mysql

/*
app.use("/", sednicaRuter);
app.use("/", korisnikRuter);
app.use("/", dnevniRedRuter);
app.use("/", autentikacijaRuter);
*/

export default app;
