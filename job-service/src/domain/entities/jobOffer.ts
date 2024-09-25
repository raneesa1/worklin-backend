import { ObjectId, Schema } from "mongoose";
export interface mileStone {
  _id?: ObjectId;
  description: string;
  dueDate: Date;
  amount: number;
  isPaid: boolean;
}
export enum paymentOption {
  oneTime = "oneTime",
  mileStone = "mileStone",
}
export enum offerStatus {
  pending = "pending",
  accepted = "accepted",
  rejected = "rejected",
}
export enum paymentType {
  hourly = "hourly",
  fixed = "fixed",
}
export interface IJobOffer {
  _id?: ObjectId;
  clientId: Schema.Types.ObjectId;
  freelancerId: string;
  hiringTeam: string;
  relatedJobId: string;
  title: string;
  paymentType: string;
  paymentOption: paymentOption;
  totalAmount: number;
  hourlyRate: number;
  numberOfHours: number;
  mileStone: Schema.Types.ObjectId[];
  description: string;
  files: string[];
  offerStatus: offerStatus;
  isActive: Boolean;
  dueDate: Date;
  createdAt?: Date;
  expiresAt?:Date
}
