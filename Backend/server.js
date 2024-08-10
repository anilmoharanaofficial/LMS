import app from "./app.js";
import connectToDB from "./config/database.js";
import cloudinary from "cloudinary";
import { config } from "dotenv";
config();
import Razorpay from "razorpay";

const PORT = process.env.PORT || 4546;

//Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Razorpay
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.listen(PORT, async () => {
  //DB Connection
  await connectToDB();
  console.log(`Server is listening at http://localhost:${PORT}`);
});
