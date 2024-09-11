import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

/**
 * sendMessageController - Sends a message using the sendMessageUseCase.
 *
 * This controller:
 * 1. Retrieves message data from the request body.
 * 2. Validates if message data is provided.
 * 3. Executes the sendMessageUseCase to send the message using the provided data.
 * 4. Returns an error response if message data is missing or if sending the message fails.
 * 5. Returns a success response with the sent message details if successful.
 * 6. Passes any caught errors to the error handler middleware.
 */

export const sendMessageController = (dependencies: IDependencies) => {
  const {
    useCases: { sendMessageUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      console.log(data, "consoling the data");
      if (!data) {
        return console.log("no data"); // return next(ErrorResponse.badRequest("data is required"));
      }

      const sendMessage = await sendMessageUseCase(dependencies).execute(data);
      if (!sendMessage) {
        return console.log("no data is provided");
        // return next(ErrorResponse.badRequest("data is required...."));
      }

      return res.status(200).send({
        success: true,
        user: sendMessage,
        message: "message send successfully",
      });
    } catch (error: any) {
      //   next(ErrorResponse.badRequest(error.message));
      console.log(error, "consoling the error form send message controller");
    }
  };
};
