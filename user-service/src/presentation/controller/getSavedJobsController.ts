import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getSavedJobsController = (dependencies: IDependencies) => {
  const { getSavedJobsUseCase } = dependencies.useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("hi from get saved job controller");
      const { freelancerId } = req.params;
      const savedJobs = await getSavedJobsUseCase(dependencies).execute(
        freelancerId
      );
      console.log(savedJobs, "consoling the saved jobs");

      if (!savedJobs || savedJobs.length === 0) {
        res.status(404).json({ message: "No savedJobs found" });
        return;
      }

      res.status(200).json(savedJobs);
    } catch (error) {
      console.error("Error getting experience of user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
