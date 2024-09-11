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
exports.getSkillByCategoryIdController = void 0;
const getSkillByCategoryIdController = (dependencies) => {
    const { useCases: { getSkillByCategoryIdUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { categoryId } = req.params;
            if (!categoryId) {
                res.status(400).json({ message: "Category ID is required" });
                return;
            }
            const skills = yield getSkillByCategoryIdUseCase(dependencies).execute(categoryId);
            res.status(200).json({
                message: "Skills retrieved successfully!",
                skills,
            });
        }
        catch (error) {
            console.error("Error in getAllCategories controller:", error);
            res
                .status(500)
                .json({ message: error.message || "Internal Server Error" });
        }
    });
};
exports.getSkillByCategoryIdController = getSkillByCategoryIdController;
