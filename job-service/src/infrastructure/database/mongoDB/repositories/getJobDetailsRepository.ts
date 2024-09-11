import { JobPost } from "../../../../domain/interface/IJobPost";
import { JobPostModel } from "../model/job-post.model";

export async function getJobDetailsRepository(
  jobIds: string[]
): Promise<JobPost[]> {
  try {
    const jobDetails = await JobPostModel.find({ _id: { $in: jobIds } }).exec();

    if (!jobDetails || jobDetails.length === 0) {
      console.error("No jobs found for the provided IDs.");
      return [];
    }

    return jobDetails;
  } catch (error) {
    console.error("Error fetching job details from database:", error);
    throw error;
  }
}
