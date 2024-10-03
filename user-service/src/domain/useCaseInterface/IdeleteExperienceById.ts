import { IExperience } from "../entities/Iexperience";

export interface IDeleteExperienceById {
  execute(experienceId: string): Promise<{ success: boolean }>;
}
