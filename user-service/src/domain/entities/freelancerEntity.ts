import { ObjectId, Types } from "mongoose";
import { IAddress } from "../interface/IAddress";
import { Category } from "../interface/ICategory";
import { skillEntity } from "./skillEntity";
import { IEducation } from "../interface/IEducation";

export interface FreelancerEntity {
  _id?: ObjectId | Types.ObjectId;
  firstName: string;
  email: string;
  password?: string;
  secondName?: string;
  phoneNumber: number;
  accountType: string;
  subCategory: string[];
  bio: string;
  role: string;
  picture: string;
  country: string;
  isBlocked: boolean;
  resume: string;
  category: string[];
  experience: string[];
  education: string[];
  dob: Date;
  languages: string[];
  isProfileCompleted: boolean;
  address?: string[];
  hourlyRate: number;
  serviceRate: number;
  freelancedBefore: string;
  freelancingGoal: string;
  skill: string[];
  token?: number;
  appliedJobs?: string[];
  publicId?: string;
  savedJobs?: string[];
  jobInvites?: string[];
}
 
