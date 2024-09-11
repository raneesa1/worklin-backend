import { ObjectId, Types } from "mongoose";

export interface adminEntity {
  _id?: ObjectId;
  firstName: string;
  secondName?: string;
  phoneNumber: number;
  picture: string;
  email: string;
  password: string;
  accountType: string;
  isVerified: boolean;
  country: string;
  createdAt?: Date;
  CompanyName: string;
}
