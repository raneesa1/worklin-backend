import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getInvitedFreelancersController = (dependencies: IDependencies) => {
  const { getInvitedFreelancersUseCase } = dependencies.useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { jobId } = req.params;
      if (!jobId) {
        res.status(404).json({ message: "jobId is required" });
        return;
      }
      const freelancer = await getInvitedFreelancersUseCase(
        dependencies
      ).execute(jobId);

      if (!freelancer) {
        res.status(404).json({ message: "No freelancer found" });
        return;
      }

      res.status(200).json(freelancer);
    } catch (error) {
      console.error("Error getting experience of user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
