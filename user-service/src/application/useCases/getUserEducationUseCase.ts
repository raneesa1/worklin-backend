import { IDependencies } from "../../application/interfaces/IDependencies";

export const getUserEducationUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (id: string): Promise<any[] | null> => {
      return await repositories.getEducation(id);
    },
  };
};
