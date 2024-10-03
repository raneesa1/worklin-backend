import mongoose, { Document, ObjectId, Types } from "mongoose";

export interface skillEntity extends mongoose.Document {
  _id?: ObjectId;
  name: string;
  description?: string;
}
