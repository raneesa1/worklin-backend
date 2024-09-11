import { FreelancerModel } from "../model/freelancer"; // Adjust path accordingly

export async function removeSavedJobRepository(
  jobId: string,
  freelancerId: string
): Promise<{ success: boolean }> {
  try {
    // Find the freelancer by ID
    const freelancer = await FreelancerModel.findById(freelancerId);

    if (!freelancer) {
      throw new Error("Freelancer not found");
    }

    // Remove the jobId from savedJobs array
    freelancer.savedJobs = freelancer.savedJobs.filter(
      (savedJob:string) => savedJob !== jobId
    );

    // Save the freelancer with updated savedJobs
    await freelancer.save();

    return { success: true };
  } catch (error) {
    console.error("Error removing job from freelancer's saved jobs:", error);
    return { success: false };
  }
}
