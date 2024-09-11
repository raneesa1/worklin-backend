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
exports.listAllMessageController = void 0;
const listAllMessageController = (dependencies) => {
    const { useCases: { listAllMessageUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.query.id;
            if (!data) {
                console.log("no data provided");
                // return next(ErrorResponse.badRequest("data is required"));
            }
            const messages = yield listAllMessageUseCase(dependencies).execute(String(data));
            if (!messages) {
                console.log("no message found");
                // return next(ErrorResponse.badRequest("data is required"));
            }
            return res.status(200).send({
                success: true,
                user: messages,
                message: "message listed successfully",
            });
        }
        catch (error) {
            console.log("consoling the error from list all message controller", error);
            //   next(ErrorResponse.badRequest(error.message));
        }
    });
};
exports.listAllMessageController = listAllMessageController;
