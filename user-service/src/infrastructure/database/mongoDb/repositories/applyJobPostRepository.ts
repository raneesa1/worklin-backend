import { FreelancerEntity, IExperience } from "../../../../domain/entities";
import { ExperienceModel } from "../model/experienceModel";
import { FreelancerModel } from "../model/freelancer";

export const applyJobPostRepository = async (
  userId: string,
  jobPostId: string
): Promise<FreelancerEntity | null> => {
  try {
    console.log(userId, "consoling the user id");
    const freelancer = await FreelancerModel.findById(userId);
    if (!jobPostId) {
      throw new Error("job post id not found");
    }
    console.log(freelancer, "consoling the freelancer ");
    if (!freelancer) {
      throw new Error("Freelancer not found");
    }
    if (freelancer.token <= 0) {
      throw new Error("Insufficient tokens to apply for the job");
    }
    freelancer.appliedJobs.push(jobPostId);
    freelancer.token -= 1;

    await FreelancerModel.findByIdAndUpdate(
      userId,
      {
        $inc: { tokens: -1 },
        $push: { appliedJobs: jobPostId },
      },
      { new: true } // Return the updated document
    );

    await freelancer.save();

    return freelancer;
  } catch (error) {
    console.error("Error saving experience or updating freelancer:", error);
    throw new Error("Error saving experience or updating freelancer");
  }
};
