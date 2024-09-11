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
exports.getFreelancersBySkillUseCase = void 0;
const freelancer_1 = require("../../infrastructure/database/mongoDb/model/freelancer");
const getFreelancersBySkillUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute: (skills) => __awaiter(void 0, void 0, void 0, function* () {
            const freelancers = yield freelancer_1.FreelancerModel.find({
                skills: { $in: skills },
            });
            return freelancers || null;
        }),
    };
};
exports.getFreelancersBySkillUseCase = getFreelancersBySkillUseCase;
