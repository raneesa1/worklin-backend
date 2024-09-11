import { Schema, model, Document, Types } from "mongoose";
import {
  IJobInvites,
  ISavedJobs,
} from "../../../../domain/entities/IJobInvites";


const savedJobsSchema = new Schema({
  freelancerId: { type: String, required: true },
  clientId: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  jobId: { type: String },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  experience: { type: String, required: true },
  skills: [{ type: String, required: true }],
  priceFrom: { type: Number, required: true },
  priceTo: { type: Number, required: true },
  rate: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  hires: { type: Number },
  status: {
    type: String,
    enum: ["active", "stopped", "draft"],
    default: "active",
  },
  applications: { type: Number },
  location: { type: String },
});

export const SavedJobsModel = model<ISavedJobs>("SavedJobs", savedJobsSchema);
