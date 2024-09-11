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
exports.findExperienceByUserId = findExperienceByUserId;
const experienceModel_1 = require("../model/experienceModel");
function findExperienceByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch experiences from the database by userId
            const experiences = yield experienceModel_1.ExperienceModel.find({
                userId: userId,
            }).exec();
            console.log(experiences, "consoling the experience");
            return experiences;
        }
        catch (error) {
            console.error("Error fetching experiences by userId:", error);
            throw new Error("Error fetching experiences");
        }
    });
}
