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
exports.updateExperience = updateExperience;
const experienceModel_1 = require("../model/experienceModel");
function updateExperience(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const experience = yield experienceModel_1.ExperienceModel.findById(id);
            console.log(experience, "consoling the experience after finding with id");
            console.log(id, data);
            const updatedExperience = yield experienceModel_1.ExperienceModel.findByIdAndUpdate(id, data, {
                new: true,
            }).exec();
            return { success: true };
        }
        catch (error) {
            console.error("Error updating skill:", error);
            throw error;
        }
    });
}
