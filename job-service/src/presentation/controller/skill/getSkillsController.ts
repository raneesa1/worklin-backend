import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
export const getSkills = (dependencies: IDependencies) => {
  const {
    useCases: { getSkillsUseCase },
  } = dependencies;
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10;

      if (page < 1 || itemsPerPage < 1) {
        res
          .status(400)
          .json({ message: "Invalid page or itemsPerPage values." });
        return;
      }

      const { skills, totalItems } = await getSkillsUseCase(
        dependencies
      ).execute(page, itemsPerPage);

      // Always return a 200 status, even if no skills are found
      res.status(200).json({
        message: skills.length
          ? "Skills retrieved successfully."
          : "No skills found for this page.",
        skills,
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / itemsPerPage),
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
};