import { FreelancerEntity } from "../entities";

export interface IGetJobOfferHiresUseCase {
  execute(jobId: string): Promise<Array<{ freelancer: FreelancerEntity }>>;
}
