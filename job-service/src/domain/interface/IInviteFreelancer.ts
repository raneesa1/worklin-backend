import { skillEntity } from "../entities/skillEntity";

export enum invitedFreelancerStatus {
  received = "received",
  accepted = "accepted",
  rejected = "rejected",
}

export interface IInviteFreelancer {
  _id?: string;
  clientId: string;
  freelancerId: string;
  jobId: string;
  description: string;
  requestedAt?: Date;
  clientName: string;
  status?: invitedFreelancerStatus;
}
