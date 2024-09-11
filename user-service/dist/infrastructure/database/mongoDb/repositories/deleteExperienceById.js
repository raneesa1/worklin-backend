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
exports.deleteExperienceById = deleteExperienceById;
const experienceModel_1 = require("../model/experienceModel");
function deleteExperienceById(experienceId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch experiences from the database by userId
            const result = yield experienceModel_1.ExperienceModel.findByIdAndDelete(experienceId);
            if (!result) {
                throw new Error("Experience not found");
            }
            return { success: true };
        }
        catch (error) {
            console.error("Error fetching experiences by userId:", error);
            throw new Error("Error fetching experiences");
        }
    });
}
