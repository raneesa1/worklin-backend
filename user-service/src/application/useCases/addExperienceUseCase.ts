import { IExperience } from "../../domain/useCaseInterface/Iexperience";
import { IExperienceRepository } from "../../domain/interface/IExperienceRepository";
import { IDependencies } from "../interfaces/IDependencies";

export const addExperienceUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute(experience: IExperience): Promise<IExperience | null> {
      return repositories.addExperience(experience,experience.userId);
    },
  };
};
