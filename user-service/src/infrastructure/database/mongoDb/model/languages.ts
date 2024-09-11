import { model, Schema } from "mongoose";
import { Tlanguage } from "../../../../domain/interface/Tlanguage";

const languageSchema = new Schema<Tlanguage>({
  userId: { type: String },
  language: { type: String, required: true },
  proficiency: { type: String, required: true },
});

export const languageModel = model<any>("Language", languageSchema);
