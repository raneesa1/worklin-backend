import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getFreelancerByIdController = (dependencies: IDependencies) => {
  const { getFreelancerByIdUseCase } = dependencies.useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { freelancerId } = req.params;
      if (!freelancerId) {
        res.status(404).json({ message: "freelancer id is required" });
        return;
      }
      const freelancer = await getFreelancerByIdUseCase(dependencies).execute(
        freelancerId
      );

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
