import { skillEntity } from "../entities/skillEntity";

enum jobPostStatus {
  client = "active",
  freelancer = "stopped",
  admin = "draft",
}

export interface JobPost {
  _id?: string;
  clientId: string;
  title: string;
  description: string;
  duration: string;
  experience: string;
  skills: skillEntity[];
  priceFrom: number;
  priceTo: number;
  rate: string;
  isCompleted?: boolean;
  createdAt?: Date;
  isActive?: boolean;
  acceptedApplication?: string[];
  hires?: string[];
  applications?: string[];
  status?: jobPostStatus;
  appliedFreelancers?: string[];
}
