import { FreelancerEntity } from "../entities";
import { ISavedJobs } from "../entities/IJobInvites";

export interface IGetSavedJobsUseCase {
  execute(freelancerId: string): Promise<ISavedJobs[] | null>;
}
