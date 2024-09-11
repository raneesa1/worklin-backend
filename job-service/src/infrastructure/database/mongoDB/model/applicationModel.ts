import { Schema, model, Document, Types } from "mongoose";
import { JobPost } from "../../../../domain/interface/IJobPost";
import { boolean, required } from "joi";
import { IApplication } from "../../../../domain/interface/IApplication";

const applicationSchema = new Schema({
  freelancerId: { type: String, required: true },
  resume: { type: String },
  freelancerName: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, enum: ["accepted", "rejected", "hired"] },
  jobPostId: { type: String, required: true },
  freelancerTitle: { type: String },
  freelancerLocation: { type: String },
  freelancerProfile: { type: String },
  publicId: { type: String },
});

export const applicationModel = model<IApplication>(
  "Application",
  applicationSchema
);
