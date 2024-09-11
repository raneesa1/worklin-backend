import { IDependencies } from "../interfaces/IDependencies";

export const removeSavedJobUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (
      jobId: string,
      freelancerId: string
    ): Promise<{ success: boolean }> => {
      try {
        return await repositories.removeSavedJobRepository(jobId, freelancerId);
      } catch (error) {
        console.error("Error in removeSavedJobUseCase:", error);
        throw error;
      }
    },
  };
};
