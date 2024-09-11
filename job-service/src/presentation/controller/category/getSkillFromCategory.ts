// src/interfaces/controllers/CategoryController.ts
import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getSkillByCategoryIdController = (dependencies: IDependencies) => {
  const {
    useCases: { getSkillByCategoryIdUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { categoryId } = req.params;
      if (!categoryId) {
        res.status(400).json({ message: "Category ID is required" });
        return;
      }

      const skills = await getSkillByCategoryIdUseCase(dependencies).execute(
        categoryId
      );

      res.status(200).json({
        message: "Skills retrieved successfully!",
        skills,
      });
    } catch (error: any) {
      console.error("Error in getAllCategories controller:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
