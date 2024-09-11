import mongoose, { Schema, Document, model } from "mongoose";
import { IEducation } from "../../../../domain/interface/IEducation";

const educationSchema = new Schema<IEducation>(
  {
    userId: { type: String, required: true },
    school: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    fromMonth: { type: String, required: true },
    fromYear: { type: String, required: true },
    toMonth: { type: String, required: true },
    toYear: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export const EducationModel = model<IEducation>("Education", educationSchema);
