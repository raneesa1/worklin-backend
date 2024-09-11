import { Types } from "mongoose";
import { JobPost } from "../../../../domain/interface/IJobPost";
import { JobPostModel } from "../model/job-post.model";

export async function createJobPost(jobPostData: JobPost): Promise<JobPost> {
  try {
    console.log("hi from job post repository");
    const {
      clientId,
      title,
      description,
      duration,
      experience,
      skills,
      priceFrom,
      priceTo,
      rate,
    } = jobPostData;

    const skillIds = skills.map((skill) => new Types.ObjectId(skill._id));
    console.log(skillIds, "consoling the skills id");

    const newJobPost = new JobPostModel({
      clientId: new Types.ObjectId(clientId),
      title,
      description,
      duration,
      experience,
      skills: skillIds,
      priceFrom,
      priceTo,
      rate,
    });

    console.log(newJobPost, "consoling the new job post");
    const savedJobPost = await newJobPost.save();

    // Populate the skills field to return the complete skill objects
    const populatedJobPost = await JobPostModel.findById(savedJobPost._id)
      .populate("skills")
      .exec();

    if (!populatedJobPost) {
      throw new Error("Job post not found after creation");
    }

    console.log(populatedJobPost, "consoling the populated job post");

    // Return the populated job post as a plain object
    return populatedJobPost.toObject();
  } catch (error: any) {
    console.error("Error saving the job post:", error);
    throw new Error("Error saving the job post: " + error.message);
  }
}
