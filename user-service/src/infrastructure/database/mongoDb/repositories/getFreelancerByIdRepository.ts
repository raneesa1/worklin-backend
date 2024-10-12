import { Types } from "mongoose";
import { FreelancerEntity, IExperience } from "../../../../domain/entities";
import { FreelancerModel } from "../model/freelancer";
import { ClientModel } from "../model/client";

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
      .populate({
        path: "category",
        populate: {
          path: "skills", // Populates the 'skills' field inside 'category'
          model: "Skill", // Refers to the 'Skill' model
        },
      })
      .exec();

    if (freelancer) {
      console.log(freelancer, "Freelancer found");
      return freelancer;
    }

    // If no freelancer found, check if the user is a client
    console.log("No freelancer found, checking for client...");
    const client = await ClientModel.findById(freelancerId).exec();

    if (client) {
      console.log(client, "Client found");
      return client;
    }

    throw new Error("No user found with this ID");
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Error fetching user");
  }
}
