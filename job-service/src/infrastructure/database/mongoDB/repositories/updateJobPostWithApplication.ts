// src/infrastructure/database/mongoDB/repositories/categoryRepository.ts
import { skillEntity } from "../../../../domain/entities/skillEntity";
import { IApplication } from "../../../../domain/interface/IApplication";
import { applicationModel } from "../model/applicationModel";
import { CategoryModel } from "../model/categoryModel";
import { JobPostModel } from "../model/job-post.model";

export const updateJobPostWithApplication = async (
  applicationDetails: IApplication
): Promise<{ success: boolean; message: string }> => {
  try {
    const existingApplication = await applicationModel.findOne({
      jobPostId: applicationDetails.jobPostId,
      freelancerId: applicationDetails.freelancerId,
    });

    if (existingApplication) {
      console.log("User has already applied for this job");
      return {
        success: false,
        message: "You have already applied for this job.",
      }; // Exit the function if the user has already applied
    }

    const application = await applicationModel.create({
      jobPostId: applicationDetails.jobPostId,
      freelancerId: applicationDetails.freelancerId,
      freelancerName: applicationDetails.freelancerName,
      email: applicationDetails.email,
      resume: applicationDetails.resume,
      publicId: applicationDetails.publicId,
      freelancerTitle: applicationDetails.freelancerTitle,
      freelancerCategory: applicationDetails.freelancerCategory,
      freelancerLocation: applicationDetails.freelancerLocation,
      freelancerProfile: applicationDetails.freelancerProfile,
    });

    const updatedJobPost = await JobPostModel.findByIdAndUpdate(
      applicationDetails.jobPostId,
      {
        $push: { applications: application._id },
        appliedFreelancers: applicationDetails.freelancerId,
      },
      { new: true }
    );
    if (!updatedJobPost) {
      throw new Error("Job post not found");
    }

    console.log("Job post updated successfully:", updatedJobPost);
    return {
      success: true,
      message: "Application submitted successfully.",
    };
  } catch (error) {
    console.error("Error updating job post with application:", error);
    throw error;
  }
};
