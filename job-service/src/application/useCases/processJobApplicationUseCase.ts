import { IDependencies } from "../interfaces/IDependencies";
import { IApplication } from "../../domain/interface/IApplication";

export const processJobApplicationUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (
      applicationData: IApplication
    ): Promise<{ success: boolean; message: string }> => {
      try {
        const result = await repositories.updateJobPostWithApplication(
          applicationData
        );
        return result;
      } catch (error) {
        console.error("Error processing job application:", error);
        return {
          success: false,
          message:
            "An unexpected error occurred while processing your application.",
        };
      }
    },
  };
};
