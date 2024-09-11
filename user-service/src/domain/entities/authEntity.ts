import { ObjectId } from "mongoose";

enum accountType {
  client = "client",
  freelancer = "freelancer",
  admin = "admin",
}

export interface authEntity {
  _id?: ObjectId;
  firstName ?: string;
  secondName?: string;
  email: string;
  password: string;
  accountType: string;
  isBlocked?: boolean;
  country: string;
  picture?: string;
}
