import { FreelancerEntity } from "../../domain/entities";
import { IAddress } from "../../domain/interface/IAddress";
import { IDependencies } from "../interfaces/IDependencies";

export const getAdminDashboardUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    async execute(timeRange: string): Promise<AdminDashboardData> {
      try {
        const data = await repositories.getAdminDashboardDataRepository(
          timeRange
        );
        if (!data) {
          throw new Error("admin dashboard data could not be fetched.");
        }

        // Return the updated freelancer details
        return data;
      } catch (error) {
        console.error("Error in addLocationUseCase:", error);
        throw error;
      }
    },
  };
};
