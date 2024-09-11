import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getExperienceController = (dependencies: IDependencies) => {
  const { getUserExperienceUseCase } = dependencies.useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.params.userId;

      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }


      const experiences = await getUserExperienceUseCase(dependencies).execute(
        userId
      );

      if (!experiences || experiences.length === 0) {
        res.status(404).json({ message: "No experiences found for this user" });
        return;
      }

      res.status(200).json(experiences);
    } catch (error) {
      console.error("Error getting experience of user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
