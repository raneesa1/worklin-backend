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
        res.status(400).json({ message: "Job ID is required." });
        return;
      }

      // Create the use case instance by passing dependencies
      const deleteUseCase = deleteJobPostUseCase(jobId);

      // Call the execute method with jobId as the argument
      const deleted = await deleteUseCase.execute(jobId);

      if (deleted) {
        res.status(200).json({
          message: "Deleted job successfully!",
        });
      } else {
        res.status(404).json({
          message: "Job not found or already deleted",
        });
      }
    } catch (error) {
      console.error("Error in deleting job post controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};