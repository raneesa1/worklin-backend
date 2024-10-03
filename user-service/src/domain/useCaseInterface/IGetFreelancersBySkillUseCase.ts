import { FreelancerEntity } from "../entities";
import { IExperience } from "../entities/Iexperience";

export interface IGetFreelancersBySkillUseCase {
  execute(skills: string[]): Promise<FreelancerEntity[] | null>;
}
