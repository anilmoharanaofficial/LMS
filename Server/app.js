import { config } from "dotenv";
import express, { urlencoded } from "express";
import morgan from "morgan";
import userRoute from "./routes/userRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import courceRouter from "./routes/courseRoute.js";
import lessonRouter from "./routes/lessonRoute.js";
import paymentRoute from "./routes/paymentRoute.js";

config();
const app = express();

// MIddlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

/////////////////////////////////////
//ROUTES
app.use("/api/v1/user", userRoute);
app.use("/api/v1/courses", courceRouter);
app.use("/api/v1/lesson", lessonRouter);
app.use("/api/v1/payments", paymentRoute);

////////////////////////////////////
//ERROR MIDDLEWARE
app.use(errorMiddleware);

export default app;
