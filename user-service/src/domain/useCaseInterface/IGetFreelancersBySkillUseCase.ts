import { FreelancerEntity } from "../entities";
import { IExperience } from "./Iexperience";

export interface IGetFreelancersBySkillUseCase {
  execute(skills: string[]): Promise<FreelancerEntity[] | null>;
}
