import { IDependencies } from "../interfaces/IDependencies";
import { authEntity } from "../../domain/entities";

export const saveAuthDetails = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (data: authEntity): Promise<void> => {
      try {
        await repositories.saveUserToDb(data);
      } catch (error) {
        console.error("Error saving auth details:", error);
        throw error;
      }
    },
  };
};
