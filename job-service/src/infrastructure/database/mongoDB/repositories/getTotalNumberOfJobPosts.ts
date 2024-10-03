// src/infrastructure/database/mongoDB/repositories/categoryRepository.ts
import { skillEntity } from "../../../../domain/entities/skillEntity";
import { CategoryModel } from "../model/categoryModel";
import { JobPostModel } from "../model/job-post.model";

export const getTotalNumberOfJobPostsRepository = async (): Promise<number> => {
  try {
    const totalPosts = await JobPostModel.countDocuments();
    return totalPosts;
  } catch (error) {
    console.error("Error fetching skills by category ID:", error);
    throw error;
  }
};
