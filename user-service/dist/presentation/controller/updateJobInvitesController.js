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
exports.updateJobInvitesController = void 0;
const updateJobInvitesController = (dependencies) => {
    const { updateJobInvitesUseCase } = dependencies.useCases;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, jobPostId, status } = req.body;
            console.log(userId, jobPostId, status, "=>>>>>>>>>");
            // Ensure both userId and jobPostId are provided
            if (!userId || !jobPostId || !status) {
                res
                    .status(400)
                    .json({ message: "User ID and Job Post ID are required" });
                return;
            }
            // Execute the use case
            const freelancer = yield updateJobInvitesUseCase(dependencies).execute(userId, jobPostId, status);
            // Return the updated freelancer data
            res.status(200).json(freelancer);
        }
        catch (error) {
            console.error("Error getting experience of user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.updateJobInvitesController = updateJobInvitesController;
