"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addExperienceUseCase = void 0;
const addExperienceUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute(experience) {
            return repositories.addExperience(experience, experience.userId);
        },
    };
};
exports.addExperienceUseCase = addExperienceUseCase;
