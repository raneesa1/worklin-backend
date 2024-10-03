import { IExperience } from "../entities/Iexperience";

export interface IAddExperienceUseCase {
  execute(experience: IExperience): Promise<IExperience | null>;
}
