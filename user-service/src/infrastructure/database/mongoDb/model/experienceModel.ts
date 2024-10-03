// src/infrastructure/database/mongoDb/model/experienceModel.ts
import mongoose, { Schema } from "mongoose";
import { IExperienceDocument } from "../../../../domain/entities";
 
const experienceSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    jobLocation: { type: String, required: true },
    country: { type: String, required: true },
    startMonth: { type: String },
    startYear: { type: String },
    startDate: { type: String, required: true },
    endMonth: { type: String },
    endYear: { type: String },
    endDate: { type: String },
    description: { type: String, required: true },
    isCurrentlyWorking: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export const ExperienceModel = mongoose.model<IExperienceDocument>(
  "Experience",
  experienceSchema
);
