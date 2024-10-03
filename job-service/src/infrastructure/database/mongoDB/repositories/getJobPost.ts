// src/infrastructure/database/mongoDB/repositories/categoryRepository.ts
import { skillEntity } from "../../../../domain/entities/skillEntity";
import { JobPost } from "../../../../domain/interface/IJobPost";
import { CategoryModel } from "../model/categoryModel";
import { JobPostModel } from "../model/job-post.model";

export const getJobPost = async (): Promise<JobPost[]> => {
  try {
    const jobPosts: JobPost[] = await JobPostModel.find({
      isCompleted: true,
      isActive:true
    })
      .populate("skills") // Only fetch the skill `name` field
      .populate("applications") // Only fetch the skill `name` field
      .exec();
    console.log(jobPosts, "consoling the job post from backend");
    return jobPosts;
  } catch (error) {
    console.error("Error fetching skills by category ID:", error);
    throw error;
  }
};
