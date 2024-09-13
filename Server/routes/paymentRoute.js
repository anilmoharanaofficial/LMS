import { Router } from "express";
import {
  buySubscription,
  getRazorpayApiKey,
} from "../controllers/paymentController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const paymentRoute = Router();

paymentRoute.get("/razorpay_key", isLoggedIn, getRazorpayApiKey);

paymentRoute.post("/subscribe", isLoggedIn, buySubscription);

export default paymentRoute;
