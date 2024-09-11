import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { JobPost } from "../../../domain/interface/IJobPost";
import { validateJobPostInput } from "../../../utils/validations/validateJobPost";

export const getJobPostByClientIdController = (dependencies: IDependencies) => {
  const {
    useCases: { getJobPostByClientIdUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { clientId } = req.params;
      if (!clientId) {
        throw new Error("client id is required");
      }
      const JobPosts = await getJobPostByClientIdUseCase(dependencies).execute(
        clientId
      );

      console.log(JobPosts, "consoling the JobPosts job post");

      if (JobPosts && JobPosts.length > 0) {
        res.status(200).json({
          message: "Job posts retrieved successfully!",
          jobPosts: JobPosts, // Ensure this key matches your Angular service expectations
        });
      } else {
        res.status(404).json({
          message: "No job posts found for this client!",
          jobPosts: [], // Provide an empty array for consistency
        });
      }
    } catch (error) {
      console.error("Error in creating job post controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
