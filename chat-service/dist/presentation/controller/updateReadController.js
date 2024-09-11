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
exports.updateReadStatusController = void 0;
const updateReadStatusController = (dependencies) => {
    const { useCases: { updateReadUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { sender, receiver, status } = req.body;
            if (!sender || !receiver || !status) {
                return console.log("no sender reciever status provided");
                // return next(ErrorResponse.badRequest("data is required"));
            }
            const updateStatus = yield updateReadUseCase(dependencies).execute(sender, receiver, status);
            if (!updateStatus) {
                return console.log("no updated status");
                // return next(ErrorResponse.badRequest("data is required...."));
            }
            return res.status(200).send({
                success: true,
                user: updateStatus,
                message: "status updated successfully",
            });
        }
        catch (error) {
            console.log("error from update status controller", error);
            //   next(ErrorResponse.badRequest(error.message));
        }
    });
};
exports.updateReadStatusController = updateReadStatusController;
