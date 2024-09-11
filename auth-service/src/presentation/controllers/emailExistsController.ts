import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const emailExistsController = (dependencies: IDependencies) => {
  const {
    useCases: { findUserByEmailUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.query;

     console.log(email,'consoling the query from email  controller')
      const existingUser = await findUserByEmailUseCase(dependencies).execute(email as string);

      console.log(existingUser,'consoling existing user from email validation backend')
      if (existingUser) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    } catch (error) {
      next(error);
    }
  };
};
