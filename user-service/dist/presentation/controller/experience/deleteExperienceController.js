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
exports.deleteExperienceController = void 0;
const deleteExperienceController = (dependencies) => {
    const { deleteUserExperienceUseCase } = dependencies.useCases;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const experienceId = req.params.experienceId;
            if (!experienceId) {
                res.status(400).json({ message: "Experience ID is required" });
                return;
            }
            console.log(experienceId, "consoling the experience id");
            const result = yield deleteUserExperienceUseCase(dependencies).execute(experienceId);
            console.log(result.success, "consoling the result");
            if (result.success) {
                res.status(200).json({ message: "Experience deleted successfully" });
            }
            else {
                res.status(404).json({ message: "Experience not found" });
            }
        }
        catch (error) {
            console.error("Error getting experience of user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.deleteExperienceController = deleteExperienceController;
