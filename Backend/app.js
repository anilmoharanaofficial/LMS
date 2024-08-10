import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import erroMiddleware from "./middlewares/errorMiddleware.js";
import courceRoutes from "./routes/courseRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

//Middleware.....
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

//Routes.........
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/cources", courceRoutes);
app.use("/api/v1/payment", paymentRoutes);

//Testig......
app.use("/ping", (req, res) => {
  res.send("Server is Running.......");
});

//Non-existent URL..........
app.all("*", (req, res) => {
  res.status(404).send("OOPS!! 404 Page Not Found.....");
});

//Error Middlewre
app.use(erroMiddleware);

//Exportig.........
export default app;
