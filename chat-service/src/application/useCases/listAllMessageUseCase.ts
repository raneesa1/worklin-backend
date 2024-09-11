import { IDependencies } from "../interfaces/IDependencies";

export const listAllMessageUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { listAllMessage },
  } = dependencies;
  return {
    execute: async (id: string) => {
      try {
        return await listAllMessage(id);
      } catch (error: any) {
        throw new Error(error);
      }
    },
  };
};
