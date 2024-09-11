import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const createRoomController = (dependencies: IDependencies) => {
  const {
    useCases: { createRoomUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      if (!data || !data.sender || !data.receiver) {
        return console.log("no data");
        // return next(ErrorResponse.badRequest("data is required."));
      }

      const sendMessage = await createRoomUseCase(dependencies).execute(data);
      if (!sendMessage) {
        return console.log("no data");
        // return next(ErrorResponse.badRequest("data is required"));
      }

      return res.status(200).send({
        success: true,
        user: sendMessage,
        message: "room created successfully",
      });
    } catch (error: any) {
      return console.log("error", error);
      //   next(ErrorResponse.badRequest(error.message));
    }
  };
};
