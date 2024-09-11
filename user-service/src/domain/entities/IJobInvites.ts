import { skillEntity } from "./skillEntity";

export enum JobInvitesStatus {
  received = "received",
  accepted = "accepted",
  rejected = "rejected",
}

export interface IJobInvites {
  _id?: string;
  clientId: string;
  freelancerId: string;
  jobId: string;
  description: string;
  requestedAt?: Date;
  clientName: string;
  status?: JobInvitesStatus;
}

enum savedJobStatus {
  active = "active",
  stopped = "stopped",
  draft = "draft",
}
export interface ISavedJobs {
  freelancerId: string;
  clientId: string;
  jobId: string;
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
  status?: savedJobStatus;
}
