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
exports.getAdminDashboardUseCase = void 0;
const getAdminDashboardUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute(timeRange) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = yield repositories.getAdminDashboardDataRepository(timeRange);
                    if (!data) {
                        throw new Error("admin dashboard data could not be fetched.");
                    }
                    // Return the updated freelancer details
                    return data;
                }
                catch (error) {
                    console.error("Error in addLocationUseCase:", error);
                    throw error;
                }
            });
        },
    };
};
exports.getAdminDashboardUseCase = getAdminDashboardUseCase;
