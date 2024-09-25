import { Schema, model, Document, Types } from "mongoose";
import { mileStone } from "../../../../domain/entities/jobOffer";

const mileStoneSchema = new Schema<mileStone>(
  {
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    amount: { type: Number },
    isPaid: { type: Boolean },
  },
  {
    timestamps: true,
  }
);
export const MileStoneModel = model<mileStone>("MileStone", mileStoneSchema);
