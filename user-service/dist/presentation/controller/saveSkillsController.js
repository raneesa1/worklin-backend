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
exports.saveSkillsController = void 0;
const categoryValidation_1 = require("../../utils/validation/categoryValidation");
const saveSkillsController = (dependencies) => {
    const { useCases: { SaveFreelancerSkillsUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, category, subcategories, skills } = req.body;
        console.log("Request body:", req.body); // Console log request body
        try {
            // Validate the incoming request
            const { error } = (0, categoryValidation_1.categoryValidation)(req.body);
            if (error) {
                console.log("Validation Error:", error.details[0].message); // Log validation error
                return res.status(400).json({ message: error.details[0].message });
            }
            if (!userId) {
                console.log("userId not found"); // Log missing userId
                return res.status(400).json({ message: "userId not found" });
            }
            console.log("Calling Use Case with:", {
                userId,
                category,
                subcategories,
                skills,
            }); // Log before calling the use case
            const result = yield SaveFreelancerSkillsUseCase(dependencies).execute(userId, category, subcategories, skills);
            console.log("Use case executed successfully. Result:", result); // Log result
            return res.status(200).json({
                message: "Skills and category saved successfully",
                data: result,
            });
        }
        catch (error) {
            console.error("Controller Error:", error); // Log the caught error
            return res
                .status(500)
                .json({ error: "Failed to save skills and category" });
        }
    });
};
exports.saveSkillsController = saveSkillsController;
