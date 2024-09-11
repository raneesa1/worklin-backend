import { Schema, model, Document, Types } from "mongoose";
import { IJobInvites } from "../../../../domain/entities/IJobInvites";

const jobInvitesSchema = new Schema({
  clientId: { type: String, required: true },
  freelancerId: { type: String, required: true },
  clientName: { type: String },
  jobId: { type: String },
  description: { type: String, required: true },
  requestedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["received", "accepted", "rejected"],
    default: "received",
  },
});

export const JobInvitesModel = model<IJobInvites>(
  "JobInvites",
  jobInvitesSchema
);
