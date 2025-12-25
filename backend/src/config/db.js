import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("Connecting to MongoDB...", process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed");
    process.exit(1);
  }
};
