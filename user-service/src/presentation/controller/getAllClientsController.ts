import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getAllClientsController = (dependencies: IDependencies) => {
  const { getAllClientsUseCase } = dependencies.useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const clients = await getAllClientsUseCase(dependencies).execute();

      if (!clients || clients.length === 0) {
        res.status(404).json({ message: "No freelancers found" });
        return;
      }

      res.status(200).json(clients);
    } catch (error) {
      console.error("Error getting experience of user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
