import { ISavedJobs } from "../../../../domain/entities/IJobInvites";
import { FreelancerModel } from "../model/freelancer";
import { SavedJobsModel } from "../model/savedJobsModel";

export async function getSavedJobsRepository(
  freelancerId: string
): Promise<ISavedJobs[]> {
  try {
    const freelancer = await FreelancerModel.findById(freelancerId);
    if (!freelancer) {
      console.error(`Freelancer with ID ${freelancerId} not found.`);
      return [];
    }
    console.log(freelancer);
    const savedJobs = await SavedJobsModel.find({
      jobId: { $in: freelancer.savedJobs },
    }).sort({ createdAt: -1 });

    return savedJobs;
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    throw error;
  }
}
