import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://anilmoharana:BiX6IVWdcVmM60vc@cluster0.wmbnw45.mongodb.net/LMS";

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);

    if (connection) {
      console.log(`Connected To DB: ${connection.host}`);
    }
  } catch (err) {
    console.log(err, "Error in DB Connection");
    process.exit(1);
  }
};

export default connectToDB;
