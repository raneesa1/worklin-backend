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
exports.updateSkill = void 0;
const updateSkill = (dependencies) => {
    const { useCases: { updateSkillUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('hi from update skill controller');
            const { id } = req.params;
            const { name, description } = req.body;
            console.log(id, name, description, 'consoling the body and params');
            // Validate the ID parameter and request body
            if (!id) {
                res.status(400).json({ message: "Skill ID is required." });
                return;
            }
            if (!name && !description) {
                res
                    .status(400)
                    .json({
                    message: "At least one field (name or description) is required to update.",
                });
                return;
            }
            // Prepare the skill update data
            const updateData = { name, description };
            // Call the use case to update the skill
            const updatedSkill = yield updateSkillUseCase(dependencies).execute(id, updateData);
            if (!updatedSkill) {
                res.status(404).json({ message: "Skill not found." });
                return;
            }
            // Respond with the updated skill
            res.status(200).json({
                message: "Skill updated successfully.",
                skill: updatedSkill,
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};
exports.updateSkill = updateSkill;
