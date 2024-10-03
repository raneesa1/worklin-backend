import mongoose, { Document, Types } from "mongoose";

export interface skillEntity {
  _id?: Types.ObjectId | string;
  name: string;
  description?: string;
}
