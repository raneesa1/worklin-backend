import { Schema, model, Document, Types, Model } from "mongoose";
import { IPayment } from "../../../../domain/interface/ITransaction";

interface IPaymentModel extends Model<IPayment> {
  updateStatuses: () => Promise<void>;
}

const paymentSchema = new Schema<IPayment>({
  offerId: { type: Schema.Types.ObjectId, required: true },
  contractTitle: { type: String, required: true },
  sender: {
    accountType: { type: String, required: true },
    senderId: { type: Schema.Types.ObjectId, required: true },
  },
  receiver: {
    accountType: { type: String, required: true },
    receiverId: { type: Schema.Types.ObjectId, required: true },
  },
  status: {
    type: String,
    enum: ["issued", "due", "overdue", "paid", "paymentFailed"],
    default: "issued",
  },
  totalAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

paymentSchema.index({ dueDate: 1 }); // Index for efficient querying by dueDate

paymentSchema.statics.updateStatuses = async function () {
  const now = new Date();

  // Update 'issued' to 'due' when the due date has arrived
  await this.updateMany(
    { status: "issued", dueDate: { $lte: now } },
    {
      $set: {
        status: "due",
        updatedAt: now,
      },
    }
  );

  // Update 'due' to 'overdue' when 24 hours have passed since the due date
  const overdueThreshold = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  await this.updateMany(
    { status: "due", dueDate: { $lt: overdueThreshold } },
    {
      $set: {
        status: "overdue",
        updatedAt: now,
      },
    }
  );
};

export const PaymentModel = model<IPayment, IPaymentModel>(
  "Payment",
  paymentSchema
);

// Function to schedule the status update task
export function schedulePaymentStatusUpdates() {
  setInterval(() => {
    PaymentModel.updateStatuses().catch((error) => {
      console.error("Error updating payment statuses:", error);
    });
  }, 15 * 60 * 1000); // Run every 15 minutes
}
