import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const updateExperienceController = (dependencies: IDependencies) => {
  const {
    useCases: { updateExperienceUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("hi from update experience controller");
      const { experienceId } = req.params;
      const updateData = req.body;
      const userId = updateData.userId;

      console.log(
        updateData,
        "consoling the updated data =?????+???????????+??????/"
      );

      console.log(userId, "fnlekrfnlerkfnler");
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const updatedExperience = await updateExperienceUseCase(
        dependencies
      ).execute(experienceId, updateData, userId);

      console.log(updatedExperience, "consoling the updated experience");
      if (!updatedExperience.success) {
        res
          .status(404)
          .json({ message: "experience not found or unauthorized." });
        return;
      }

      res.status(200).json({
        message: "experience updated successfully.",
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
};
