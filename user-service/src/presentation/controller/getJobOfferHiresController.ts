import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getJobOfferHiresController = (dependencies: IDependencies) => {
  const { getJobOfferHiresUseCase } = dependencies.useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { jobId } = req.params;
      if (!jobId) {
        res.status(400).json({ message: "jobId is required" });
        return;
      }
      const hires = await getJobOfferHiresUseCase(dependencies).execute(jobId);

      if (!hires || hires.length === 0) {
        res.status(404).json({ message: "No hires found for this job" });
        return;
      }

      res.status(200).json(hires);
    } catch (error) {
      console.error("Error getting hires for job:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
