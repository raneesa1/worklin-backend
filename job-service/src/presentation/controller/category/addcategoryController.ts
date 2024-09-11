// src/interfaces/controllers/CategoryController.ts
import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { Category } from "../../../domain/entities/category";
import { Types } from "mongoose";

export const createCategoryController = (dependencies: IDependencies) => {
  const {
    useCases: { createCategoryUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log(
        req.body,
        "consoling the req/body from create category controller"
      );

      const { name, description, subcategories, skills } = req.body;

      // Basic validation
      if (!name || !description || !subcategories || !skills) {
        res.status(400).json({ message: "All fields are required." });
        return;
      }

      // Convert skill IDs to ObjectId
      const skillObjectIds = skills.map(
        (skill: string) => new Types.ObjectId(skill)
      );

      // Create a new category entity
      const categoryData: Category = {
        name,
        description,
        subcategories,
        skills: skillObjectIds,
      };

      console.log(
        categoryData,
        "consoling the category data before sending to the use case"
      );

      // Call the use case to create the category
      const category = await createCategoryUseCase(dependencies).execute(
        categoryData
      );

      // Respond with the created category
      res.status(201).json({
        message: "Category created successfully!",
        category,
      });
    } catch (error: any) {
      console.error("Error in createCategory controller:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
