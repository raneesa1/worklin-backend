import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { JobPost } from "../../../domain/interface/IJobPost";
import { validateJobPostInput } from "../../../utils/validations/validateJobPost";

export const deleteJobPostController = (dependencies: IDependencies) => {
  const {
    useCases: { deleteJobPostUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { jobId } = req.body;
      // Validate the ID parameter
      if (!jobId) {
        res.status(400).json({ message: "category ID is required." });
        return;
      }
      // Directly call the JobPostUseCase with jobPost as the argument
      const deleted = await deleteJobPostUseCase(dependencies).execute(jobId);

      console.log(deleted, "consoling the created job post");
      res.status(201).json({
        message: "deleted job successfully!",
      });
    } catch (error) {
      console.error("Error in creating job post controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
