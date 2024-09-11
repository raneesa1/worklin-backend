import { FreelancerEntity, IExperience } from "../../../../domain/entities";
import { FreelancerModel } from "../model/freelancer";

export async function getFreelancersRepository(): Promise<
  FreelancerEntity[] | null
> {
  try {
    const freelancers: FreelancerEntity[] = await FreelancerModel.find({
      isProfileCompleted: true,
    })
      .populate("skill")
      .populate("experience")
      .populate("education")
      .populate("languages")
      .populate("address")
      .exec();

    return freelancers;
  } catch (error) {
    console.error("Error fetching experiences by userId:", error);
    throw new Error("Error fetching experiences");
  }
}
