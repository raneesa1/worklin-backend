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
exports.addLocationUseCase = void 0;
const addLocationUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute(freelancerId, location, imageUrl) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    // Save the address and get the updated freelancer details
                    const updatedFreelancer = yield repositories.saveAddress(freelancerId, location);
                    if (!updatedFreelancer) {
                        throw new Error("Address could not be saved.");
                    }
                    // Update the freelancer's profile image
                    const imageSaved = yield repositories.saveProfileImage(freelancerId, imageUrl);
                    if (!imageSaved) {
                        throw new Error("Profile image could not be updated.");
                    }
                    // Return the updated freelancer details
                    return updatedFreelancer;
                }
                catch (error) {
                    console.error("Error in addLocationUseCase:", error);
                    throw error;
                }
            });
        },
    };
};
exports.addLocationUseCase = addLocationUseCase;
