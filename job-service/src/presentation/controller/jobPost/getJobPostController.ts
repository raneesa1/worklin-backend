import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { JobPost } from "../../../domain/interface/IJobPost";
import { validateJobPostInput } from "../../../utils/validations/validateJobPost";

export const getJobPostController = (dependencies: IDependencies) => {
  const {
    useCases: { getJobPostUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("hi from controller get job controller");
      const JobPosts = await getJobPostUseCase(dependencies).execute();

      console.log(JobPosts, "consoling the JobPosts job post");
      res.status(201).json({
        message: "get Job post successfully!",
        jobPost: JobPosts,
      });
    } catch (error) {
      console.error("Error in creating job post controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
