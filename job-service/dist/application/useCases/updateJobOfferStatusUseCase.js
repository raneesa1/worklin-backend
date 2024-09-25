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
exports.updateStatusJobOfferUseCase = void 0;
const updateStatusJobOfferUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute: (jobOfferId, isAccepted) => __awaiter(void 0, void 0, void 0, function* () {
            return yield repositories.updateJobOfferStatusRepository(jobOfferId, status);
        }),
    };
};
exports.updateStatusJobOfferUseCase = updateStatusJobOfferUseCase;
