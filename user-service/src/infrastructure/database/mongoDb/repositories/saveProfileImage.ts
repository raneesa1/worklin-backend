import { FreelancerModel } from "../model/freelancer"; // Adjust path accordingly

export async function saveProfileImage(
  freelancerId: string,
  imageUrl: string
): Promise<boolean> {
  try {
    console.log(
      `Updating profile image for freelancer ID ${freelancerId} with URL ${imageUrl}`
    );

    // Find the freelancer by ID
    const freelancer = await FreelancerModel.findById(freelancerId);
    if (!freelancer) {
      console.error(`Freelancer with ID ${freelancerId} not found.`);
      return false;
    }

    // Update the freelancer's profile image URL
    freelancer.picture = imageUrl;
    await freelancer.save();

    console.log("Profile image updated successfully.");
    return true;
  } catch (error) {
    console.error("Error updating profile image:", error);
    throw error;
  }
}
