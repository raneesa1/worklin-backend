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
exports.createRoomController = void 0;
const createRoomController = (dependencies) => {
    const { useCases: { createRoomUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (!data || !data.sender || !data.receiver) {
                return console.log("no data");
                // return next(ErrorResponse.badRequest("data is required."));
            }
            const sendMessage = yield createRoomUseCase(dependencies).execute(data);
            if (!sendMessage) {
                return console.log("no data");
                // return next(ErrorResponse.badRequest("data is required"));
            }
            return res.status(200).send({
                success: true,
                user: sendMessage,
                message: "room created successfully",
            });
        }
        catch (error) {
            return console.log("error", error);
            //   next(ErrorResponse.badRequest(error.message));
        }
    });
};
exports.createRoomController = createRoomController;
