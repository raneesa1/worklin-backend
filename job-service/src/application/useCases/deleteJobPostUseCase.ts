// deleteSkillUseCase.ts
import { IDependencies } from "../../application/interfaces/IDependencies";
 
export const deleteJobPostUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (id: string): Promise<boolean> => {
      try {
        const result = await repositories.deleteJobPostRepository(id);
        return result;
      } catch (error: any) {
        throw new Error(`Error in deleteJobPostUseCase: ${error.message}`);
      }
    },
  };
};
