import { Router } from "express";
import {
  allSubscription,
  buySubscription,
  cancelSubscription,
  getRazorpayApiKey,
  verifySubscription,
} from "../controllers/paymentController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const paymentRoute = Router();

paymentRoute.get("/razorpay_key", isLoggedIn, getRazorpayApiKey);

paymentRoute.post("/subscribe", isLoggedIn, buySubscription);

paymentRoute.post("/verify", isLoggedIn, verifySubscription);

paymentRoute.post("/unsubscribe", isLoggedIn, cancelSubscription);

paymentRoute.post("/", isLoggedIn, allSubscription);

export default paymentRoute;
