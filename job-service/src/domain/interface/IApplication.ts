import { skillEntity } from "../entities/skillEntity";

export enum status {
  applied = "applied",
  accepted = "accepted",
  rejected = "rejected",
  hired = "hired",
}

export interface IApplication {
  _id?: string;
  freelancerId: string;
  resume?: string;
  email: string;
  freelancerName: string;
  status: status;
  jobPostId: string;
  freelancerTitle: string;
  freelancerCategory: string;
  freelancerLocation: string;
  freelancerProfile: string;
  publicId: string;
}
