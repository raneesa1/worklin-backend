import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { skillEntity } from "../../../domain/entities/skillEntity";

export const createSkill = (dependencies: IDependencies) => {
  const {
    useCases: { createSkillUseCase },
  } = dependencies;
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log(
        req.body,
        "consoling the req/body from create skill controller"
      );

      const { name, description } = req.body;

      // Basic validation
      if (!name) {
        res;
        res.status(400).json({ message: "Name and description are required." });
        return;
      }

      // Create a new skill entity
      const skillData: skillEntity = {
        name,
        description,
        // Include other necessary fields, if any
      } as skillEntity

      console.log(
        skillData,
        "consoling the skill data before sending to the frontend"
      );
      // Call the use case to create the skill
      const skill = await dependencies.useCases
        .createSkillUseCase(dependencies)
        .execute(skillData);

      // Respond with the created skill
      res.status(201).json({
        message: "Skill created successfully!",
        skill,
      });
    } catch (error: any) {
      console.error("Error in createSkill controller:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
