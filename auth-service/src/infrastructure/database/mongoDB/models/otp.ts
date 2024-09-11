import { Schema, model, Document } from "mongoose";

interface OtpDocument extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema = new Schema<OtpDocument>({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, expires: 30, default: Date.now },
});

export const Otp = model<OtpDocument>("Otp", otpSchema);
