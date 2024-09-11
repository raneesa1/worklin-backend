import { IExperience } from "./Iexperience";

export interface IDeleteExperienceById {
  execute(experienceId: string): Promise<{ success: boolean }>;
}
