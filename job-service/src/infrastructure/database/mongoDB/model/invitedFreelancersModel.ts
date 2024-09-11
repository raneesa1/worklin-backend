import { Schema, model, Document, Types } from "mongoose";
import { IInviteFreelancer } from "../../../../domain/interface/IInviteFreelancer";

const invitedFreelancersSchema = new Schema({
  clientId: { type: String, required: true },
  freelancerId: { type: String, required: true },
  jobId: { type: String },
  clientName: { type: String },
  description: { type: String, required: true },
  requestedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["received", "accepted", "rejected"],
    default: "received",
  },
});

export const InviteFreelancerModel = model<IInviteFreelancer>(
  "invitedFreelancers",
  invitedFreelancersSchema
);
