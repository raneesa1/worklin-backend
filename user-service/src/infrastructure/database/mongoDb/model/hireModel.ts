import mongoose, { Schema, Document, model, Types } from "mongoose";

const hireSchema = new Schema(
  {
    client: { type: Types.ObjectId, ref: "Client", required: true },
    freelancer: { type: Types.ObjectId, ref: "Freelancer", required: true },
    jobDetails: { type: Schema.Types.Mixed, required: true }, // Store job-related details
    hireDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,  
  }
);

export const HireModel = model("Hire", hireSchema);
