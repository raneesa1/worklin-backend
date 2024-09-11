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
exports.updateEducation = updateEducation;
const educationModel_1 = require("../model/educationModel");
function updateEducation(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const education = yield educationModel_1.EducationModel.findById(id);
            console.log(education, 'consoling the education after finding with id');
            console.log(id, data);
            return yield educationModel_1.EducationModel.findByIdAndUpdate(id, data, { new: true }).exec();
        }
        catch (error) {
            console.error("Error updating skill:", error);
            throw error;
        }
    });
}
