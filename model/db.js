import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const mongoUrl = process.env.MONGODB_URL;

  if (!mongoUrl) {
    throw new Error("MONGODB_URL is not defined in environment variables");
  }

  await mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 5000,
  });
};
