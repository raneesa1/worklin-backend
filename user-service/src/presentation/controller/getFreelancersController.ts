import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getFreelancersController = (dependencies: IDependencies) => {
  const { getFreelancersUseCase } = dependencies.useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {

      const freelancers = await getFreelancersUseCase(dependencies).execute();

      if (!freelancers || freelancers.length === 0) {
        res.status(404).json({ message: "No freelancers found" });
        return;
      }

      res.status(200).json(freelancers);
    } catch (error) {
      console.error("Error getting experience of user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
