import { FreelancerEntity } from "../entities";
import { IAddress } from "../interface/IAddress";

export interface IApplyJobPostUseCase {
  execute(
    freelancerId: string,
    jobPostId: string,
   ): Promise<FreelancerEntity | null>;
}
