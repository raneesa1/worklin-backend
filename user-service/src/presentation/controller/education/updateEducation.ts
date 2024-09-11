import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const updateEducationController = (dependencies: IDependencies) => {
  const {
    useCases: { updateEducationUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("hi from update education controller");
      const { educationId } = req.params;
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

      const updatedEducation = await updateEducationUseCase(
        dependencies
      ).execute(educationId, updateData, userId);

      console.log(updatedEducation, "consoling the updated education");
      if (!updatedEducation) {
        res
          .status(404)
          .json({ message: "Education not found or unauthorized." });
        return;
      }

      res.status(200).json({
        message: "Education updated successfully.",
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
};
