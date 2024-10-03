import { IDependencies } from "../../application/interfaces/IDependencies";
import { skillEntity } from "../../domain/entities/skillEntity";
import { IGetTotalNumberOfJobPostUseCase } from "../../domain/useCaseInterface";
import { IGetSkillsUseCase } from "../../domain/useCaseInterface/IskillUserCase";

export const getTotalNumberOfJobPostUseCase = (
  dependencies: IDependencies
): IGetTotalNumberOfJobPostUseCase => {
   const {
     repositories: { getTotalNumberOfJobPostsRepository },
   } = dependencies;

  return {
    execute: async (): Promise<number> => {
      return await getTotalNumberOfJobPostsRepository();
    },
  };
};
