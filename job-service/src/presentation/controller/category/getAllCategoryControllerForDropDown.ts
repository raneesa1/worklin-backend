// src/interfaces/controllers/CategoryController.ts
import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getAllCategoryForDropDownController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { getAllCategoryForDropDownUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Call the use case to get all categories without pagination
      const categories = await getAllCategoryForDropDownUseCase(
        dependencies
      ).execute();

      // Respond with the fetched categories
      res.status(200).json({
        message: "All categories retrieved successfully!",
        categories,
      });
    } catch (error: any) {
      console.error("Error in getAllCategories controller:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
