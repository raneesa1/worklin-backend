import { Schema } from "mongoose";
import { UserEntity } from "../../../../domain/entities";
import mongoose from "mongoose";
import { string } from "joi";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    secondName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    picture: {
      type: String,
    },
    accountType: {
      type: String,
      enum: ["client", "freelancer", "admin"],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
    },
    verificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<UserEntity>("users", userSchema);
