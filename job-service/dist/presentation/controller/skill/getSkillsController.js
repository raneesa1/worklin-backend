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
exports.getSkills = void 0;
const getSkills = (dependencies) => {
    const { useCases: { getSkillsUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const page = parseInt(req.query.page) || 1;
            const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
            if (page < 1 || itemsPerPage < 1) {
                res
                    .status(400)
                    .json({ message: "Invalid page or itemsPerPage values." });
                return;
            }
            const { skills, totalItems } = yield getSkillsUseCase(dependencies).execute(page, itemsPerPage);
            // Always return a 200 status, even if no skills are found
            res.status(200).json({
                message: skills.length
                    ? "Skills retrieved successfully."
                    : "No skills found for this page.",
                skills,
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems / itemsPerPage),
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};
exports.getSkills = getSkills;
