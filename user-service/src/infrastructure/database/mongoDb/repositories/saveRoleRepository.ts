import { IAddress } from "../../../../domain/interface/IAddress";
import { AddressModel } from "../model/addressModel";
import { FreelancerModel } from "../model/freelancer"; // Adjust path accordingly

export async function saveRoleRepository(
  role: string,
  freelancerId: string
): Promise<{ success: boolean }> {
  try {
    console.log(`Saving address for freelancer ID ${freelancerId}:`);

    const freelancer = await FreelancerModel.findById(freelancerId);
    if (!freelancer) {
      console.error(`Freelancer with ID ${freelancerId} not found.`);
      return { success: false };
    }
    freelancer.role = role;
    await freelancer.save();
    return { success: true };
  } catch (error) {
    console.error("Error saving address to database:", error);
    throw error;
  }
}
