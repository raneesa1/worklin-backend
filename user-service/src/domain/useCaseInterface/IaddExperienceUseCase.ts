import { IExperience } from "./Iexperience";

export interface IAddExperienceUseCase {
  execute(experience: IExperience): Promise<IExperience | null>;
}
