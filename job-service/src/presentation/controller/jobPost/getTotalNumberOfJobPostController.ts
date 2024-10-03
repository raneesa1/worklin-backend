import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { JobPost } from "../../../domain/interface/IJobPost";
import { validateJobPostInput } from "../../../utils/validations/validateJobPost";

export const getTotalNumberOfJobPostController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { getTotalNumberOfJobPostUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("hi from controller get job getTotalNumberOfJobPostUseCase");
      const NumberOfJobPosts = await getTotalNumberOfJobPostUseCase(
        dependencies
      ).execute();

      console.log(NumberOfJobPosts, "consoling the JobPosts job post");
      res.status(201).json({
        NumberOfJobPosts,
      });
    } catch (error) {
      console.error("Error in creating job post controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
