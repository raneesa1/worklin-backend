import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { categoryValidation } from "../../utils/validation/categoryValidation";

export const saveSkillsController = (dependencies: IDependencies) => {
  const {
    useCases: { SaveFreelancerSkillsUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { userId, category, subcategories, skills } = req.body;
    console.log("Request body:", req.body); // Console log request body

    try {
      // Validate the incoming request
      const { error } = categoryValidation(req.body);
      if (error) {
        console.log("Validation Error:", error.details[0].message); // Log validation error
        return res.status(400).json({ message: error.details[0].message });
      }

      if (!userId) {
        console.log("userId not found"); // Log missing userId
        return res.status(400).json({ message: "userId not found" });
      }

      console.log("Calling Use Case with:", {
        userId,
        category,
        subcategories,
        skills,
      }); // Log before calling the use case
      const result = await SaveFreelancerSkillsUseCase(dependencies).execute(
        userId,
        category,
        subcategories,
        skills
      );

      console.log("Use case executed successfully. Result:", result); // Log result
      return res.status(200).json({
        message: "Skills and category saved successfully",
        data: result,
      });
    } catch (error) {
      console.error("Controller Error:", error); // Log the caught error
      return res
        .status(500)
        .json({ error: "Failed to save skills and category" });
    }
  };
};
