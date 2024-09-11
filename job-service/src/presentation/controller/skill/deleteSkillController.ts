import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const deleteSkill = (dependencies: IDependencies) => {
  const {
    useCases: { deleteSkillUseCase },
  } = dependencies;
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("hi from delete skill controller");
      const { id } = req.params;

      console.log(id, "consoling the id from delete controller ");
      // Validate the ID parameter
      if (!id) {
        res.status(400).json({ message: "Skill ID is required." });
        return;
      }

      // Call the use case to delete the skill
      const deletedSkill = await deleteSkillUseCase(dependencies).execute(id);

      if (!deletedSkill) {
        res.status(404).json({ message: "Skill not found." });
        return;
      }

      // Respond with a success message
      res.status(200).json({
        message: "Skill deleted successfully.",
        skillId: id,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
};
