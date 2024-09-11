import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const updateReadStatusController = (dependencies: IDependencies) => {
  const {
    useCases: { updateReadUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sender, receiver, status } = req.body;

      if (!sender || !receiver || !status) {
        return console.log("no sender reciever status provided");
        // return next(ErrorResponse.badRequest("data is required"));
      }

      const updateStatus = await updateReadUseCase(dependencies).execute(
        sender,
        receiver,
        status
      );
      if (!updateStatus) {
        return console.log("no updated status");

        // return next(ErrorResponse.badRequest("data is required...."));
      }

      return res.status(200).send({
        success: true,
        user: updateStatus,
        message: "status updated successfully",
      });
    } catch (error: any) {
      console.log("error from update status controller", error);
      //   next(ErrorResponse.badRequest(error.message));
    }
  };
};
