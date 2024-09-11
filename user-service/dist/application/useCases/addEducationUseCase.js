"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEducationUseCase = void 0;
const addEducationUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute(education) {
            return repositories.addEducation(education, education.userId);
        },
    };
};
exports.addEducationUseCase = addEducationUseCase;
