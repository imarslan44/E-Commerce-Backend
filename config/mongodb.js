import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

 
// Connect to MongoDB
const connectDB = async () => {

  // Check if DB_URI is defined
  if (!DB_URI) {
  console.error("DB_URI is not defined");
  process.exit(1);
}
  
  try{
    console.log("connecting to DB...")
    await mongoose.connect(`${DB_URI}/e-commerce`); 
    console.log("MongoDB connected successfully");
  }catch(error){ 
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
}   

export default connectDB;