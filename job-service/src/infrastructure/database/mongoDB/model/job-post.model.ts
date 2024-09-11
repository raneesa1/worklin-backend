import { Schema, model, Document, Types } from "mongoose";
import { JobPost } from "../../../../domain/interface/IJobPost";
import { boolean } from "joi";

const jobPostSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  experience: { type: String, required: true },
  skills: [{ type: Types.ObjectId, ref: "Skill", required: true }],
  priceFrom: { type: Number, required: true },
  priceTo: { type: Number, required: true },
  rate: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  hires: [{ type: String }],
  status: {
    type: String,
    enum: ["active", "stopped", "draft"],
    default: "active",
  },
  acceptedApplication: [{ type: String, ref: "Application" }],
  invitedFreelancers: [{ type: String, ref: "invitedFreelancers" }],
  applications: [{ type: String, ref: "Application" }],
  appliedFreelancers: [{ type: String }],
});

export const JobPostModel = model<JobPost>("JobPost", jobPostSchema);
