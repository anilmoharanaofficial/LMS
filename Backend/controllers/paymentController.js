import Payment from "../models/paymentModel.js";
import User from "../models/userModels.js";
import { razorpay } from "../server.js";
import AppError from "../utils/errorUtil.js";
import crypto from "crypto";

///////////////////////////////
//RAZORPAY API KEY
const getRazorpayApiKey = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Razorpay API Key",
    key: process.env.RAZORPAY_KEY_ID,
  });
};

///////////////////////////////
//BUY SUBSCRIPTION
const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorized, Please login", 400));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin Cannot purchase a subscription", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    //Success Status
    res.status(200).json({
      success: true,
      message: "You have subscribed successfully",
      subscription_id: subscription.id,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

///////////////////////////////
//VERIFY SUBSCRIPTION
const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body;

    const user = await User.findById(id);

    //Validation
    if (!user) {
      return next(new AppError("Unauthorized, Please login", 400));
    }

    const subscriptionId = user.subscription.id;

    //Generate Signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id} | ${subscriptionId}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment not verified, please try again", 500));
    }

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    user.subscription.status = "active";
    await user.save();

    //Success Status
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

///////////////////////////////
//CANCEL SUBSCRIPTION
const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    //Validation
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("Unauthorized, Please login", 400));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin Cannot cancel subscription", 400));
    }

    const subscriptionId = user.subscription.id;

    const subscription = await razorpay.subscriptions.cancel(subscriptionId);

    user.subscription.status = subscription.status;

    await user.save();

    //Success Status
    res.status(200).json({
      success: true,
      message: "Subscription cancled successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

///////////////////////////////
//DETAILS OF ALL PAYMENTS
const allPayments = async (req, res, next) => {
  try {
    const { count } = req.query;
    const subscriptions = await razorpay.subscriptions.all({
      count: count || 10,
    });

    //Success Status
    res.status(200).json({
      success: true,
      message: "All payments",
      subscriptions,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

//EXPORTING.......................
export {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayments,
};
