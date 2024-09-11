import { FreelancerEntity } from "../entities";

export interface IGetInvitedFreelancersUseCase {
  execute(
    jobId: string
  ): Promise<Array<{ freelancer: FreelancerEntity; status: string }> | null>;
}
