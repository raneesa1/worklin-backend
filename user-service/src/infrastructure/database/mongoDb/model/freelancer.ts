import mongoose, { Schema, Document, model } from "mongoose";
import { ObjectId } from "mongoose";
import { FreelancerEntity } from "../../../../domain/entities/freelancerEntity";
import { authEntity } from "../../../../domain/entities/authEntity";
import { addressSchema } from "./addressModel";
import { bool, boolean } from "joi";

const freelancerSchema = new Schema<FreelancerEntity | authEntity>({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  secondName: { type: String },
  phoneNumber: { type: Number },
  country: { type: String },
  dob: { type: Date },
  accountType: { type: String, required: true },
  picture: { type: String },
  isBlocked: { type: Boolean, default: false },
  bio: { type: String },
  resume: { type: String },
  role: { type: String },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  subCategory: [{ type: String }],
  skill: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  experience: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
  education: [{ type: Schema.Types.ObjectId, ref: "Education" }],
  languages: [{ type: Schema.Types.ObjectId, ref: "Language" }],
  isProfileCompleted: { type: Boolean, default: false },
  address: [{ type: Schema.Types.ObjectId, ref: "Address" }],
  serviceRate: { type: Number },
  hourlyRate: { type: Number },
  freelancedBefore: { type: String },
  freelancingGoal: { type: String },
  token: { type: Number, default: 30 },
  appliedJobs: [{ type: String }],
  publicId: { type: String },
  savedJobs: [{ type: String, ref: "SavedJobs" }],
  jobInvites: [{ type: Schema.Types.ObjectId, ref: "JobInvites" }],
});

export const FreelancerModel = model<any>("Freelancer", freelancerSchema);
