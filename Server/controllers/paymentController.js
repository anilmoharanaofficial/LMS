import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import { razorpay } from "../server.js";

//////////////////////////////////////
//RAZORPAY API KEY
const getRazorpayApiKey = catchAsync(async (req, res, next) => {
  const key = process.env.RAZORPAY_KEY_ID;
  sendResponse(res, "Razorpay API Key", null, null, key);
});

/////////////////////////////////////////
//BUY SUBSCRIPTION
const buySubscription = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);

  if (!user) return next(new AppError("Unauthorized, Please login", 40));

  if (user.role === "ADMIN")
    return next(new AppError("Admin cannot purchase a subscription", 400));

  const subscription = await razorpay.subscriptions.create({
    plan_id: process.env.RAZORPAY_PLAN_ID,
    customer_notify: 1,
  });

  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;

  await user.save();

  res.status(200).json({
    success: true,
    message: "You have subscribed successfully",
    subscription_id: subscription.id,
  });
});

/////////////////////////////////////////
//VERIFY SUBSCRIPTION
const verifySubscription = catchAsync(async (req, res, next) => {});

/////////////////////////////////////////
//CANCEL SUBSCRIPTION
const cancelSubscription = catchAsync(async (req, res, next) => {});

/////////////////////////////////////////
//ALL SUBSCRIPTION DETAILS
const allSubscription = catchAsync(async (req, res, next) => {});

export {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allSubscription,
};
