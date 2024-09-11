// src/infrastructure/database/mongoDB/repositories/categoryRepository.ts
import { skillEntity } from "../../../../domain/entities/skillEntity";
import { JobPost } from "../../../../domain/interface/IJobPost";
import { CategoryModel } from "../model/categoryModel";
import { JobPostModel } from "../model/job-post.model";

export const getJobPostByClientId = async (
  clientId: string
): Promise<JobPost[] | null> => {
  try {
    // Find job posts associated with the specified clientId
    const jobPosts = await JobPostModel.find({ clientId: clientId });
    if (!jobPosts || jobPosts.length === 0) {
      return null; // Return null if no job posts found
    }
    return jobPosts; // Return the array of job posts
  } catch (error) {
    console.error("Error fetching skills by category ID:", error);
    throw error;
  }
};
