import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const updateSkill = (dependencies: IDependencies) => {
  const {
    useCases: { updateSkillUseCase },
  } = dependencies;
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log('hi from update skill controller')
      const { id } = req.params;
      const { name, description } = req.body;

      console.log(id,name,description,'consoling the body and params')
      // Validate the ID parameter and request body
      if (!id) {
        res.status(400).json({ message: "Skill ID is required." });
        return;
      }
      if (!name && !description) {
        res
          .status(400)
          .json({
            message:
              "At least one field (name or description) is required to update.",
          });
        return;
      }

      // Prepare the skill update data
      const updateData = { name, description };

      // Call the use case to update the skill
      const updatedSkill = await updateSkillUseCase(dependencies).execute(
        id,
        updateData
      );

      if (!updatedSkill) {
        res.status(404).json({ message: "Skill not found." });
        return;
      }

      // Respond with the updated skill
      res.status(200).json({
        message: "Skill updated successfully.",
        skill: updatedSkill,
      });

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
};
