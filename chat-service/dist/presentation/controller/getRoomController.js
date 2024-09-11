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
exports.getRoomController = void 0;
/**
 * getRoomController - Retrieves details of a chat room by its ID.
 *
 * This controller:
 * 1. Retrieves the room ID from the request query parameters.
 * 2. Validates if the room ID is provided.
 * 3. Executes the getRoomUseCase to fetch details of the room with the provided ID.
 * 4. Returns an error response if the room ID is missing or if fetching room details fails.
 * 5. Returns a success response with the fetched room details if successful.
 * 6. Passes any caught errors to the error handler middleware.
 */
const getRoomController = (dependencies) => {
    const { useCases: { getRoomUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.query;
            if (!id) {
                return console.log("no data");
                // return next(ErrorResponse.badRequest("data is required"));
            }
            const rooms = yield getRoomUseCase(dependencies).execute(String(id));
            if (!rooms) {
                return console.log("no room");
                // return next(ErrorResponse.badRequest("data is required"));
            }
            return res.status(200).send({
                success: true,
                user: rooms,
                message: "fetched Room successfully",
            });
        }
        catch (error) {
            return console.log("error", error);
            //   next(ErrorResponse.badRequest(error.message));
        }
    });
};
exports.getRoomController = getRoomController;
