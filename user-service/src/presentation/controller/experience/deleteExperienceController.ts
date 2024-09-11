import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const deleteExperienceController = (dependencies: IDependencies) => {
  const { deleteUserExperienceUseCase } = dependencies.useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const experienceId = req.params.experienceId;
      if (!experienceId) {
        res.status(400).json({ message: "Experience ID is required" });
        return;
      }
      console.log(experienceId, "consoling the experience id");

      const result = await deleteUserExperienceUseCase(dependencies).execute(
        experienceId
      );

      console.log(result.success, "consoling the result");
      if (result.success) {
        res.status(200).json({ message: "Experience deleted successfully" });
      } else {
        res.status(404).json({ message: "Experience not found" });
      }
    } catch (error) {
      console.error("Error getting experience of user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
