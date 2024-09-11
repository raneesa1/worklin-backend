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
exports.processInviteUseCase = void 0;
const processInviteUseCase = (dependencies) => {
    const { repositories } = dependencies;
    const { jobInvitesRepository } = repositories;
    return {
        execute: (inviteData) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Process the invite
                const result = yield jobInvitesRepository(inviteData);
                return {
                    success: !!result,
                    message: result
                        ? "Invite processed successfully"
                        : "Invite processing failed",
                };
            }
            catch (error) {
                console.error("Error processing invite:", error);
                return {
                    success: false,
                    message: "An error occurred while processing the invite",
                };
            }
        }),
    };
};
exports.processInviteUseCase = processInviteUseCase;
