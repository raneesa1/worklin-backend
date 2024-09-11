import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const deleteEducationController = (dependencies: IDependencies) => {
  const { deleteEducationUseCase } = dependencies.useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const educationId = req.params.educationId;
      if (!educationId) {
        res.status(400).json({ message: "education ID is required" });
        return;
      }
      console.log(educationId, "consoling the education id");

      const result = await deleteEducationUseCase(dependencies).execute(
        educationId
      );

      console.log(result.success, "consoling the result");
      if (result.success) {
        res.status(200).json({ message: "education deleted successfully" });
      } else {
        res.status(404).json({ message: "education not found" });
      }
    } catch (error) {
      console.error("Error getting education of user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
