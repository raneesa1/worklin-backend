import { IDependencies } from "../interfaces/IDependencies";

export const getRoomUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getRoom },
  } = dependencies;
  return {
    execute: async (data: any) => {
      try {
        return await getRoom(data);
      } catch (error: any) {
        throw new Error(error);
      }
    },
  };
};
