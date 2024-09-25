const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URL;

export default async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/worklin_payment");
    console.log(`MongoDB connected successfully!`);
  } catch (error: any) {
    console.error(" Database Connection failed ");
    console.error(error.message);
    process.exit(1);
  }
};
