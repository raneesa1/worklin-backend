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
exports.deleteSkill = void 0;
const deleteSkill = (dependencies) => {
    const { useCases: { deleteSkillUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("hi from delete skill controller");
            const { id } = req.params;
            console.log(id, "consoling the id from delete controller ");
            // Validate the ID parameter
            if (!id) {
                res.status(400).json({ message: "Skill ID is required." });
                return;
            }
            // Call the use case to delete the skill
            const deletedSkill = yield deleteSkillUseCase(dependencies).execute(id);
            if (!deletedSkill) {
                res.status(404).json({ message: "Skill not found." });
                return;
            }
            // Respond with a success message
            res.status(200).json({
                message: "Skill deleted successfully.",
                skillId: id,
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};
exports.deleteSkill = deleteSkill;
