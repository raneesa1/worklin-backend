import { Types } from "mongoose";
import { JobPost } from "../../../../domain/interface/IJobPost";
import { JobPostModel } from "../model/job-post.model";

export async function editJobPost(jobPostData: JobPost): Promise<JobPost> {
  try {
    console.log("hi from edit job post repository");

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
    console.log(skillIds, "Skill IDs");

    // Find and update job post
    const updatedJobPost = await JobPostModel.findByIdAndUpdate(
      jobPostData._id,
      {
        clientId: new Types.ObjectId(clientId),
        title,
        description,
        duration,
        experience,
        skills: skillIds,
        priceFrom,
        priceTo,
        rate,
        isCompleted: true,
      },
      { new: true } // Return the updated document
    ).exec();

    if (!updatedJobPost) {
      throw new Error("Job post not found");
    }

    console.log(updatedJobPost, "Saved job post");

    return updatedJobPost.toObject();
  } catch (error: any) {
    console.error("Error updating job post:", error);
    throw new Error("Error updating job post: " + error.message);
  }
}
