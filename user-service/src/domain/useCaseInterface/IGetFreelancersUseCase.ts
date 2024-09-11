import { FreelancerEntity } from "../entities";

export interface IGetFreelancersUseCase {
  execute(): Promise<FreelancerEntity[] | null>;
}
