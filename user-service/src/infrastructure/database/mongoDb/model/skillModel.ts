import { Schema, model, Document } from "mongoose";
import { skillEntity } from "../../../../domain/entities/skillEntity";

const skillSchema = new Schema<skillEntity>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export const SkillModel = model<skillEntity>("Skill", skillSchema);
