import { ObjectId } from "mongoose";

enum accountType {
  client = "client",
  freelancer = "freelancer",
  admin = "admin",
}

export interface UserGoogleSignupEntity {
  _id?: ObjectId;
  email: string;
  name: string;
  firstName?: string;
  picture: string;
  accountType: string;
  country?: string;
  isBlocked?: boolean;
}
