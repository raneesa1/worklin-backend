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
exports.getSkillsUseCase = void 0;
const getSkillsUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute: (page, itemsPerPage) => __awaiter(void 0, void 0, void 0, function* () {
            const skip = (page - 1) * itemsPerPage;
            const limit = itemsPerPage;
            const skills = yield repositories.findAllSkills(skip, limit);
            const totalItems = yield repositories.countAllSkills();
            return { skills, totalItems };
        }),
    };
};
exports.getSkillsUseCase = getSkillsUseCase;
