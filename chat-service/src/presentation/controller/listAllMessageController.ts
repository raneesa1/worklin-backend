import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const listAllMessageController = (dependencies: IDependencies) => {
  const {
    useCases: { listAllMessageUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.query.id;

      if (!data) {
        console.log("no data provided");
        // return next(ErrorResponse.badRequest("data is required"));
      }

      const messages = await listAllMessageUseCase(dependencies).execute(
        String(data)
      );
      if (!messages) {
        console.log("no message found");
        // return next(ErrorResponse.badRequest("data is required"));
      }

      return res.status(200).send({
        success: true,
        user: messages,
        message: "message listed successfully",
      });
    } catch (error: any) {
      console.log(
        "consoling the error from list all message controller",
        error
      );
      //   next(ErrorResponse.badRequest(error.message));
    }
  };
};
