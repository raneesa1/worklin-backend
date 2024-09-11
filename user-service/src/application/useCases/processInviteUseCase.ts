import { IJobInvites } from "../../domain/entities/IJobInvites";
import { IDependencies } from "../interfaces/IDependencies";

export const processInviteUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;
  const { jobInvitesRepository } = repositories;

  return {
    execute: async (inviteData: IJobInvites) => {
      try {
        // Process the invite
        const result = await jobInvitesRepository(inviteData);
        return {
          success: !!result,
          message: result
            ? "Invite processed successfully"
            : "Invite processing failed",
        };
      } catch (error) {
        console.error("Error processing invite:", error);
        return {
          success: false,
          message: "An error occurred while processing the invite",
        };
      }
    },
  };
};
