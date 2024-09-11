import { ISavedJobs } from "../../../../domain/entities/IJobInvites";
import { SavedJobsModel } from "../model/savedJobsModel"; // Import the SavedJobs model
import { FreelancerModel } from "../model/freelancer"; // Import the Freelancer model

export async function saveJobRepository(
  jobData: ISavedJobs
): Promise<{ success: boolean }> {
  try {
    const freelancer = await FreelancerModel.findById(jobData.freelancerId);

    if (!freelancer) {
      throw new Error("Freelancer not found");
    }
    const existingSavedJob = await SavedJobsModel.findOne({
      freelancerId: jobData.freelancerId,
      jobId: jobData.jobId,
    });

    if (existingSavedJob) {
      return { success: true }; 
    }
    const savedJob = new SavedJobsModel({
      freelancerId: jobData.freelancerId,
      clientId: jobData.clientId,
      title: jobData.title,
      jobId: jobData.jobId,
      description: jobData.description,
      duration: jobData.duration,
      experience: jobData.experience,
      skills: jobData.skills,
      priceFrom: jobData.priceFrom,
      priceTo: jobData.priceTo,
      rate: jobData.rate,
      hires: jobData.hires,
      status: jobData.status,
      applications: jobData.applications,
    });

    await savedJob.save();
    freelancer.savedJobs.push(jobData.jobId);
    await freelancer.save();

    return { success: true };
  } catch (error) {
    console.error("Error saving job to freelancer's saved jobs:", error);
    throw error;
  }
}
