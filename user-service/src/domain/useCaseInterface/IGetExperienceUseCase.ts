import { IExperience } from "../entities/Iexperience";

export interface IGetExperienceUseCase {
  execute(userId: string): Promise<any[] | null>;
}
