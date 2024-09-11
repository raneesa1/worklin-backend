import { clientEntity } from "../../../../domain/entities/clientEntity";
import mongoose, { Schema, Document, model, Types } from "mongoose";
import { ObjectId } from "mongoose";
import { authEntity } from "../../../../domain/entities/authEntity";
import { adminEntity } from "../../../../domain/entities/adminEntity";

const adminSchema = new Schema<adminEntity | authEntity>({
  firstName: { type: String, required: true },
  secondName: { type: String },
  phoneNumber: { type: Number },
  picture: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  accountType: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  country: { type: String },
  createdAt: { type: Date, default: Date.now },
  CompanyName: { type: String },
});

export const AdminModel = model<any>("Admin", adminSchema);
