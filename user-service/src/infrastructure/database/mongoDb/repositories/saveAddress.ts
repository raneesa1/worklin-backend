import { FreelancerEntity } from "../../../../domain/entities";
import { IAddress } from "../../../../domain/interface/IAddress";
import { AddressModel } from "../model/addressModel";
import { FreelancerModel } from "../model/freelancer"; // Adjust path accordingly
import { SkillModel } from "../model/skillModel";
import { EducationModel } from "../model/educationModel";
import { ExperienceModel } from "../model/experienceModel";

export async function saveAddress(
  freelancerId: string,
  location: IAddress
): Promise<FreelancerEntity | null> {
  try {
    console.log(`Saving address for freelancer ID ${freelancerId}:`, location);

    // Find the freelancer by ID and populate all relevant fields
    const freelancer = await FreelancerModel.findById(freelancerId)
      .populate("address")
      .populate({
        path: "category",
        populate: { path: "skills" }, // Populate skills in category
      })
      .populate("education")
      .populate("experience")
      .populate("languages")
      .populate("skill")
      .exec();

    if (!freelancer) {
      console.error(`Freelancer with ID ${freelancerId} not found.`);
      return null;
    }

    location.userId = freelancerId;
    const savedAddress = await AddressModel.create(location);
    freelancer.address.push(savedAddress._id);
    freelancer.country = location.country;
    freelancer.dob = location.dob;
    await freelancer.save();

    console.log("Address saved successfully:", savedAddress);

    // Populate the freelancer's address and other details before returning
    const updatedFreelancer = await FreelancerModel.findById(freelancerId)
      .populate("address")
      .populate({
        path: "category",
        populate: { path: "skills" }, // Populate skills in category
      })
      .populate("education")
      .populate("experience")
      .populate("languages")
      .populate("skill")
      .exec();

    return updatedFreelancer;
  } catch (error) {
    console.error("Error saving address to database:", error);
    throw error;
  }
}
