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
exports.getExperienceController = void 0;
const getExperienceController = (dependencies) => {
    const { getUserExperienceUseCase } = dependencies.useCases;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.params.userId;
            if (!userId) {
                res.status(400).json({ message: "User ID is required" });
                return;
            }
            const experiences = yield getUserExperienceUseCase(dependencies).execute(userId);
            if (!experiences || experiences.length === 0) {
                res.status(404).json({ message: "No experiences found for this user" });
                return;
            }
            res.status(200).json(experiences);
        }
        catch (error) {
            console.error("Error getting experience of user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.getExperienceController = getExperienceController;
