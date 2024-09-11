// src/interfaces/controllers/CategoryController.ts
import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getAllCategoriesController = (dependencies: IDependencies) => {
  const {
    useCases: { getAllCategoriesUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || '';

      // Call the use case to get categories with pagination and search
      const result = await getAllCategoriesUseCase(dependencies).execute(page, limit, search);

      // Respond with the fetched categories
      res.status(200).json({
        message: "Categories retrieved successfully!",
        categories: result.categories,
        totalCount: result.totalCount,
        currentPage: page,
        totalPages: Math.ceil(result.totalCount / limit),
      });
    } catch (error: any) {
      console.error("Error in getAllCategories controller:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};