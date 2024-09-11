import { FreelancerEntity } from "../entities";
import { JobInvitesStatus } from "../entities/IJobInvites";
import { IAddress } from "../interface/IAddress";

export interface IUpdateJobInvitesUseCase {
  execute(
    freelancerId: string,
    jobPostId: string,
    status: JobInvitesStatus
  ): Promise<FreelancerEntity | null>;
}
