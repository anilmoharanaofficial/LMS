import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

export default app;
