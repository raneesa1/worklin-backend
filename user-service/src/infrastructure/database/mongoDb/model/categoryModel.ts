import { Schema, model, Document, Types } from "mongoose";
import { Category } from "../../../../domain/entities/category";


const categorySchema = new Schema<Category>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    subcategories: { type: [String], required: true }, 
    skills: [{ type: Types.ObjectId, ref: "Skill", required: true }],
  },
  {
    timestamps: true,
  }
);
export const CategoryModel = model<Category>("Category", categorySchema);
