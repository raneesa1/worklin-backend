import { Types } from "mongoose";
import { FreelancerEntity, IExperience } from "../../../../domain/entities";
import { FreelancerModel } from "../model/freelancer";

export async function getFreelancerByIdRepository(
  freelancerId: string
): Promise<FreelancerEntity | null> {
  try {
    console.log(freelancerId, "consoling the freelancer id ");

    const freelancer: FreelancerEntity = await FreelancerModel.findById(
      freelancerId
    )
      .populate("skill")
      .populate("experience")
      .populate("education")
      .populate("languages")
      .populate("address")
      .exec();

    console.log(freelancer, "consoling the freelancer");
    if (!freelancer) {
      throw new Error("no user found with this id");
    }
    return freelancer;
  } catch (error) {
    console.error("Error fetching freelancer by userId:", error);
    throw new Error("Error fetching experiences");
  }
}
