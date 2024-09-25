import { Schema, model, Document, Types, Model } from "mongoose";
import { JobPost } from "../../../../domain/interface/IJobPost";
import { boolean, string } from "joi";
import {
  IJobOffer,
  offerStatus,
  paymentOption,
} from "../../../../domain/entities/jobOffer";


// Define an interface for the methods
interface IJobOfferModel extends Model<IJobOffer> {
  deleteExpiredOffers(): Promise<void>;
}


const jobOfferSchema = new Schema<IJobOffer>({
  clientId: { type: Schema.Types.ObjectId, required: true },
  freelancerId: { type: String, required: true },
  hiringTeam: { type: String, required: true },
  relatedJobId: { type: String, required: true },
  title: { type: String, required: true },
  paymentType: { type: String },
  paymentOption: { type: String, enum: Object.values(paymentOption) }, // enum for paymentOption
  totalAmount: { type: Number, required: true },
  hourlyRate: { type: Number },
  numberOfHours: { type: Number },
  mileStone: [{ type: Schema.Types.ObjectId, ref: "MileStone" }],
  description: { type: String },
  files: [{ type: String }],
  offerStatus: {
    type: String,
    enum: Object.values(offerStatus),  
    default: offerStatus.pending,  
  },
  isActive: { type: Boolean },
  dueDate: { type: Date },
  expiresAt: { type: Date, default: () => new Date(+new Date() + 3*24*60*60*1000) },
  createdAt: { type: Date, default: Date.now, expires: "3d" }, // Add this line
});
jobOfferSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 3 * 24 * 60 * 60 }
);

// Create an index on expiresAt field
jobOfferSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Static method to handle conditional deletion
jobOfferSchema.statics.deleteExpiredOffers = async function() {
  const threeDaysAgo = new Date(+new Date() - 3*24*60*60*1000);
  await this.deleteMany({
    createdAt: { $lte: threeDaysAgo },
    offerStatus: offerStatus.pending
  });
};

export const JobOfferModel = model<IJobOffer, IJobOfferModel>(
  "JobOffer",
  jobOfferSchema
);

// Function to schedule the deletion task
export function scheduleOfferDeletion() {
  setInterval(() => {
    JobOfferModel.deleteExpiredOffers();
  }, 24 * 60 * 60 * 1000); // Run once every 24 hours
}