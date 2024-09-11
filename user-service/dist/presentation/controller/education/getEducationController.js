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
exports.getEducationController = void 0;
const getEducationController = (dependencies) => {
    const { getUserEducationUseCase } = dependencies.useCases;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.params.userId;
            if (!userId) {
                res.status(400).json({ message: "User ID is required" });
                return;
            }
            const education = yield getUserEducationUseCase(dependencies).execute(userId);
            if (!education || education.length === 0) {
                res.status(404).json({ message: "No educations found for this user" });
                return;
            }
            res.status(200).json(education);
        }
        catch (error) {
            console.error("Error getting education of user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.getEducationController = getEducationController;
