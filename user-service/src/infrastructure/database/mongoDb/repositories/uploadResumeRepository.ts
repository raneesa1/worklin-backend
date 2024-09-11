import { FreelancerEntity, IExperience } from "../../../../domain/entities";
import { ExperienceModel } from "../model/experienceModel";
import { FreelancerModel } from "../model/freelancer";

export async function uploadResumeRepository(
  freelancerId: string,
  resumeUrl: string,
  publicId: string
): Promise<{
  success: boolean;
  message?: string;
  url?: string;
  publicId?: string;
}> {
  try {
    const freelancer = await FreelancerModel.findById(freelancerId);
    if (!freelancer) {
      throw new Error("User not found");
    }

    freelancer.resume = resumeUrl;
    freelancer.publicId = publicId; // Assuming 'resume' is the field for storing the resume URL
    await freelancer.save();
    return {
      success: true,
      url: freelancer.resume,
      publicId: freelancer.publicId,
    };
  } catch (error: any) {
    console.error("Error saving resume URL:", error);
    return { success: false, message: error.message };
  }
}
