import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getEducationController = (dependencies: IDependencies) => {
  const { getUserEducationUseCase } = dependencies.useCases;

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

      const education = await getUserEducationUseCase(dependencies).execute(
        userId
      );

      if (!education || education.length === 0) {
        res.status(404).json({ message: "No educations found for this user" });
        return;
      }

      res.status(200).json(education);
    } catch (error) {
      console.error("Error getting education of user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
