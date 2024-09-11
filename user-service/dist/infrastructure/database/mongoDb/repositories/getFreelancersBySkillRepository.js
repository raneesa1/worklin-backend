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
exports.getFreelancersBySkillRepository = getFreelancersBySkillRepository;
const freelancer_1 = require("../model/freelancer");
function getFreelancersBySkillRepository(skills) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const freelancers = yield freelancer_1.FreelancerModel.find({ skills: { $in: skills } });
            return freelancers || []; // Ensure an array is always returned
        }
        catch (error) {
            console.error("Error fetching freelancers by skills:", error);
            throw new Error("Error fetching freelancers");
        }
    });
}
