import { Category, Skill, SubCategory } from "../interface/ICategory";

export interface ISaveFreelancerSkillsUseCase {
  execute(
    freelancerId: string,
    category: Category,
    subcategories: SubCategory[],
    skills: Skill[]
  ): Promise<void>;
}
