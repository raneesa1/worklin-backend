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
exports.createSkill = void 0;
const createSkill = (dependencies) => {
    const { useCases: { createSkillUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body, "consoling the req/body from create skill controller");
            const { name, description } = req.body;
            // Basic validation
            if (!name) {
                res;
                res.status(400).json({ message: "Name and description are required." });
                return;
            }
            // Create a new skill entity
            const skillData = {
                name,
                description,
                // Include other necessary fields, if any
            };
            console.log(skillData, "consoling the skill data before sending to the frontend");
            // Call the use case to create the skill
            const skill = yield dependencies.useCases
                .createSkillUseCase(dependencies)
                .execute(skillData);
            // Respond with the created skill
            res.status(201).json({
                message: "Skill created successfully!",
                skill,
            });
        }
        catch (error) {
            console.error("Error in createSkill controller:", error);
            res
                .status(500)
                .json({ message: error.message || "Internal Server Error" });
        }
    });
};
exports.createSkill = createSkill;
