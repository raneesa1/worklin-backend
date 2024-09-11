import { FreelancerEntity } from "../../../../domain/entities";
import { FreelancerModel } from "../model/freelancer";

export async function getFreelancersBySkillRepository(
  skills: string[]
): Promise<FreelancerEntity[] | null> {
  try {
    const freelancers = await FreelancerModel.find({ skills: { $in: skills } });
    return freelancers || []; // Ensure an array is always returned
  } catch (error) {
    console.error("Error fetching freelancers by skills:", error);
    throw new Error("Error fetching freelancers");
  }
}
