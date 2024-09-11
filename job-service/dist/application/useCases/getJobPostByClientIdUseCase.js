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
exports.getJobPostByClientIdUseCase = void 0;
const getJobPostByClientIdUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute: (clientId) => __awaiter(void 0, void 0, void 0, function* () {
            const jobPosts = yield repositories.getJobPostByClientId(clientId);
            return jobPosts || []; // Return an empty array if jobPosts is null
        }),
    };
};
exports.getJobPostByClientIdUseCase = getJobPostByClientIdUseCase;
