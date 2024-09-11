import { IExperience } from "./Iexperience";

export interface IGetExperienceUseCase {
  execute(userId: string): Promise<any[] | null>;
}
