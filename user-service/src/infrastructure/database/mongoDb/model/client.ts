import { clientEntity } from "../../../../domain/entities/clientEntity";
import mongoose, { Schema, Document, model, Types } from "mongoose";
import { ObjectId } from "mongoose";
import { authEntity } from "../../../../domain/entities/authEntity";

const clientSchema = new Schema<clientEntity | authEntity>({
  firstName: { type: String, required: true },
  secondName: { type: String },
  phoneNumber: { type: Number },
  picture: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  accountType: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  country: { type: String },
  jobPost: [{ type: Types.ObjectId, ref: "JobPost" }],
  createdAt: { type: Date, default: Date.now },
  CompanyName: { type: String },
  hires: [{ type: Types.ObjectId, ref: "Hire" }],
  savedTalents: [{ type: Types.ObjectId, ref: "Freelancer" }],
  projects: [{ type: Types.ObjectId, ref: "Project" }],
});

export const ClientModel = model<any>("Client", clientSchema);
