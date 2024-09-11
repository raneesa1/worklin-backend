import { IDependencies } from "../../application/interfaces/IDependencies";
import { Category, Skill, SubCategory } from "../../domain/interface/ICategory";

export const SaveFreelancerSkillsUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (
      freelancerId: string,
      category: Category,
      subcategories: SubCategory[],
      skills: Skill[]
    ): Promise<void> => {
      try {
        console.log("Executing saveFreelancerSkillsAndCategory with:", {
          freelancerId,
          category,
          subcategories,
          skills,
        }); // Log input data
        await repositories.saveFreelancerSkillsAndCategory(
          freelancerId,
          category,
          subcategories,
          skills
        );
        console.log("Data saved successfully"); // Log success
      } catch (error) {
        console.error("Use Case Error:", error); // Log any errors encountered
        throw error;
      }
    },
  };
};
