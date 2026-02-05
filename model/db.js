import mongoose from "mongoose";
// Replace with your MongoDB connection string

async function connectToDatabase() {
  try {
   const connect=  await mongoose.connect(process.env.MONGODB_URL);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

export { connectToDatabase };
