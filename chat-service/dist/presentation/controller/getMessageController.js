"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageController = void 0;
/**
 * getMessageController - Handles fetching messages for a given room ID.
 *
 * This controller:
 * 1. Retrieves the room ID from the request query parameters.
 * 2. Validates if the room ID is provided.
 * 3. Executes the getMessageUseCase to fetch messages associated with the provided room ID.
 * 4. Returns an error response if the room ID is missing or if fetching messages fails.
 * 5. Returns a success response with the fetched messages if successful.
 * 6. Passes any caught errors to the error handler middleware.
 */
const getMessageController = (dependencies) => {
    const { useCases: { getMessageUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.query.id;
            if (!data) {
                return console.log("no data");
                // return next(ErrorResponse.badRequest("data is required."));
            }
            const messages = yield getMessageUseCase(dependencies).execute(String(data));
            if (!messages) {
                return res.status(200).send({
                    message: "No message found",
                });
                // next(ErrorResponse.badRequest("data is required"));
            }
            console.log(messages, "consoling the messages from the get message controller");
            return res.status(200).send({
                success: true,
                user: messages,
                message: "fetched message successfully",
            });
        }
        catch (error) {
            console.log("consoling the error from get message controller");
            //   next(ErrorResponse.badRequest(error.message));
        }
    });
};
exports.getMessageController = getMessageController;
