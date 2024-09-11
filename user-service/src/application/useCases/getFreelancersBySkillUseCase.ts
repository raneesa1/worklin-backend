import { IDependencies } from "../../application/interfaces/IDependencies";
import { FreelancerEntity } from "../../domain/entities";
import { FreelancerModel } from "../../infrastructure/database/mongoDb/model/freelancer";

export const getFreelancersBySkillUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (skills: string[]): Promise<FreelancerEntity[] | null> => {
      const freelancers = await FreelancerModel.find({
        skills: { $in: skills },
      });
      return freelancers || null;
    },
  };
};
