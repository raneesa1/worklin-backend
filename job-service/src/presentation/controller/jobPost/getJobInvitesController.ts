import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { JobPost } from "../../../domain/interface/IJobPost";
import { validateJobPostInput } from "../../../utils/validations/validateJobPost";

export const getJobInvitesController = (dependencies: IDependencies) => {
  const {
    useCases: { getJobInvitesUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { freelancerId } = req.params;
      if (!freelancerId) {
        throw new Error("freelancer id is required");
      }
      const JobPosts = await getJobInvitesUseCase(dependencies).execute(
        freelancerId
      );
      console.log(JobPosts, "consoling the JobPosts job post");

      if (JobPosts) {
        res.status(200).json({
          message: "Job posts retrieved successfully!",
          jobPosts: JobPosts, // Ensure this key matches your Angular service expectations
        });
      } else {
        res.status(404).json({
          message: "No job posts found with this id!",
          jobPosts: [], // Provide an empty array for consistency
        });
      }
    } catch (error) {
      console.error("Error in creating job post controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
