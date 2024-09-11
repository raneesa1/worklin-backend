import { FreelancerEntity } from "../entities";

export interface IGetFreelancerByIdUseCase {
  execute(freelancerId: String): Promise<FreelancerEntity | null>;
}
