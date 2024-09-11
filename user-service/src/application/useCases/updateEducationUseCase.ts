import { IUpdateEducationUseCase } from "../../domain/useCaseInterface/IUpdateEducationUseCase";
import { IEducation } from "../../domain/interface/IEducation";
import { IDependencies } from "../interfaces/IDependencies";

export const updateEducationUseCase = (
  dependencies: IDependencies
): IUpdateEducationUseCase => {
  const { repositories } = dependencies;

  return {
    execute: async (
      id: string,
      education: Partial<IEducation>,
      userId: string
    ): Promise<{ success: boolean }> => {
      const result = await repositories.updateEducation(id, education, userId);

      return { success: true };
    },
  };
};
