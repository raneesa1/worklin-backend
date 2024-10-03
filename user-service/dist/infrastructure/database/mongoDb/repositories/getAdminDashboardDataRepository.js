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
exports.getAdminDashboardDataRepository = getAdminDashboardDataRepository;
const hireModel_1 = require("../model/hireModel");
function getAdminDashboardDataRepository(timeRange) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const startDate = getStartDate(timeRange);
            const pipeline = [
                {
                    $match: {
                        createdAt: { $gte: startDate },
                    },
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                        hires: { $sum: 1 },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
                {
                    $project: {
                        month: "$_id",
                        hires: 1,
                        _id: 0,
                    },
                },
            ];
            const hiringData = yield hireModel_1.HireModel.aggregate(pipeline);
            console.log(hiringData, "consoling the hiring data");
            return {
                hiringData,
            };
        }
        catch (error) {
            console.error("Error fetching admin dashboard data", error);
            throw new Error("Error fetching admin dashboard data");
        }
    });
}
// Helper function to get start date based on time range
function getStartDate(timeRange) {
    const now = new Date();
    switch (timeRange) {
        case "pastMonth":
            return new Date(now.setMonth(now.getMonth() - 1));
        case "last6Months":
            return new Date(now.setMonth(now.getMonth() - 6));
        case "pastYear":
            return new Date(now.setFullYear(now.getFullYear() - 1));
        case "allTime":
        default:
            return new Date(0); // Beginning of time
    }
}
