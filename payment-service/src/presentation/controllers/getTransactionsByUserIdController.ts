import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
export const getTransactionsByUserIdController = (dependencies: IDependencies) => {
  const {
    useCases: { getTransactionsByUserIdUseCase },
  } = dependencies;
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.params;

      const payments = await getTransactionsByUserIdUseCase(
        dependencies
      ).execute(userId);
      console.log(userId, "userId");
      res.status(200).json({
        payments,
        message: "user transaction fetched successfully",
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
};
