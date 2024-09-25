import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const getClientByIdController = (dependencies: IDependencies) => {
  const { getClientByIdUseCase } = dependencies.useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { clientId } = req.params;
      if (!clientId) {
        res.status(404).json({ message: "clientId id is required" });
        return;
      }
      const client = await getClientByIdUseCase(dependencies).execute(
        clientId
      );

      if (!client) {
        res.status(404).json({ message: "No client found" });
        return;
      }

      res.status(200).json(client);
    } catch (error) {
      console.error("Error getting experience of user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
