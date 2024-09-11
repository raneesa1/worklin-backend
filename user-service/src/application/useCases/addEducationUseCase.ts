
import { IDependencies } from "../interfaces/IDependencies";
import { IEducation } from "../../domain/interface/IEducation";

export const addEducationUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute(education: IEducation): Promise<IEducation | null> {
      return repositories.addEducation(education, education.userId);
    },
  };
};
