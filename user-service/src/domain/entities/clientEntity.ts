import { ObjectId, Types } from "mongoose";

export interface clientEntity {
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
  jobPost: Types.ObjectId[];
  createdAt?: Date;
  CompanyName: string;
  hires: Types.ObjectId[];
  savedTalents:Types.ObjectId[]
  projects:Types.ObjectId[]
}
