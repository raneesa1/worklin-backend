import { IEducation } from "../interface/IEducation";

export interface IUpdateEducationUseCase {
  execute(
    id: string,
    education: Partial<IEducation>,
    userId: string
  ): Promise<{ success: boolean }>;
}
