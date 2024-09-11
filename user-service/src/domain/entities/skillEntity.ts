import mongoose, { Document, Types } from "mongoose";

export interface skillEntity extends mongoose.Document {
  _id?: Types.ObjectId | string;
  name: string;
  description?: string;
}
