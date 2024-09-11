import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const deleteCategoryController = (dependencies: IDependencies) => {
  const {
    useCases: { deleteCategoryUseCase },
  } = dependencies;
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("hi from delete delete category controller");
      const { id } = req.params;

      console.log(id, "consoling the id from delete category controller ");
      // Validate the ID parameter
      if (!id) {
        res.status(400).json({ message: "category ID is required." });
        return;
      }
      const deletedCategory = await deleteCategoryUseCase(dependencies).execute(
        id
      );

      if (!deletedCategory) {
        res.status(404).json({ message: "Category not found." });
        return;
      }

      // Respond with a success message
      res.status(200).json({
        message: "category deleted successfully.",
        skillId: id,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
};
