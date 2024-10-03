import { IExperience } from "../entities/Iexperience";

export interface IUpdateExperienceUseCase {
  execute(
    id: string,
    experience: Partial<IExperience>,
    userId: string
  ): Promise<{ success: boolean }>;
}
