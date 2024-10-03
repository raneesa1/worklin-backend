import { JobPostModel } from "../model/job-post.model";

export async function deleteJobPostRepository(id: string): Promise<boolean> {
  try {
    const result = await JobPostModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    ).exec();

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
}
