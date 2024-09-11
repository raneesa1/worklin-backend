import { UserGoogleSignupEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const googleSignupUseCase = (dependencies: IDependencies) => {
  const { googleSignup } = dependencies.repositories;
  return {
    execute: async (
      data: UserGoogleSignupEntity
    ): Promise<UserGoogleSignupEntity | null> => {
      return googleSignup(data);
    },
  };
};
