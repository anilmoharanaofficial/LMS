import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import { razorpay } from "../server.js";
import crypto from "crypto";
import Payment from "../models/paymentModel.js";

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

  if (!user) return next(new AppError("Unauthorized, Please login", 401));

  if (user.role === "ADMIN")
    return next(new AppError("Admin cannot purchase a subscription", 400));

  if (user.subscription.status === "active") {
    return next(new AppError("You already have an active subscription", 400));
  }

  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 12,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    console.log(subscription);

    await user.save();

    res.status(200).json({
      success: true,
      message: "You have subscribed successfully",
      subscription_id: subscription.id,
    });
  } catch (error) {
    return next(new AppError("Subscription creation failed", 500));
  }
});

/////////////////////////////////////////
//VERIFY SUBSCRIPTION
const verifySubscription = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } =
    req.body;

  const user = await User.findById(id);
  if (!user) return next(new AppError("Unauthorized, Please login", 401));

  const subscriptionId = user.subscription.id;

  if (!razorpay_payment_id || !razorpay_signature) {
    return next(new AppError("Payment details are missing", 400));
  }

  // Generate Signature
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpay_payment_id}|${subscriptionId}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return next(
      new AppError("Payment verification failed, please try again", 500)
    );
  }

  await Payment.create({
    razorpay_payment_id,
    razorpay_signature,
    razorpay_subscription_id,
  });

  user.subscription.status = "active";
  await user.save();

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
  });
});

/////////////////////////////////////////
//CANCEL SUBSCRIPTION
const cancelSubscription = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);

  if (!user) return next(new AppError("Unauthorized, Please login", 401));

  if (user.role === "ADMIN") {
    return next(new AppError("Admin cannot cancel a subscription", 400));
  }

  try {
    const subscriptionId = user.subscription.id;

    const subscription = await razorpay.subscriptions.cancel(subscriptionId);

    user.subscription.status = "canceled";
    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscription canceled successfully",
    });
  } catch (error) {
    return next(new AppError("Failed to cancel subscription", 500));
  }
});

/////////////////////////////////////////
//ALL SUBSCRIPTION DETAILS
const allSubscription = catchAsync(async (req, res, next) => {
  const { count } = req.query;
  try {
    const subscriptions = await razorpay.subscriptions.all({
      count: count || 10,
    });

    res.status(200).json({
      success: true,
      message: "All subscriptions fetched successfully",
      subscriptions,
    });
  } catch (error) {
    return next(new AppError("Failed to fetch subscriptions", 500));
  }
});

export {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allSubscription,
};
