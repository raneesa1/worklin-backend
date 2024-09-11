import { FreelancerEntity } from "../entities";

export interface IPostProfileUseCase {
  execute(freelancer: FreelancerEntity): Promise<FreelancerEntity | null>;
}
