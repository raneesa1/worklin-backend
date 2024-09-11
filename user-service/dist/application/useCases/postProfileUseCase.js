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
exports.postProfileUseCase = void 0;
const postProfileUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute(freelancer) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const savedFreelancer = yield repositories.postProfileRepository(freelancer);
                    if (!savedFreelancer) {
                        throw new Error("Freelancer could not be updated.");
                    }
                    // Return the updated freelancer details
                    return savedFreelancer;
                }
                catch (error) {
                    console.error("Error in freelancer use case:", error);
                    throw error;
                }
            });
        },
    };
};
exports.postProfileUseCase = postProfileUseCase;
