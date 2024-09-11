// src/infrastructure/database/mongoDB/repositories/categoryRepository.ts
import { skillEntity } from "../../../../domain/entities/skillEntity";
import { JobPost } from "../../../../domain/interface/IJobPost";
import { CategoryModel } from "../model/categoryModel";
import { JobPostModel } from "../model/job-post.model";

export const getJobPostById = async (
  jobPostId: string
): Promise<JobPost | null> => {
  try {
    // Find job posts associated with the specified clientId
    const jobPost = await JobPostModel.findById(jobPostId)
      .populate("skills") // Populates the 'skills' field
      .populate("acceptedApplication") // Populates the 'acceptedApplication' field
      .populate("applications"); // Populates the 'applications' field

    if (!jobPost) {
      return null; // Return null if no job post found
    }
    return jobPost; // Return the populated job post
  } catch (error) {
    console.error("Error fetching skills by category ID:", error);
    throw error;
  }
};
