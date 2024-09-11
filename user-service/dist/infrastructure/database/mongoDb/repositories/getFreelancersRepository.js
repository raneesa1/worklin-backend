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
exports.getFreelancersRepository = getFreelancersRepository;
const freelancer_1 = require("../model/freelancer");
function getFreelancersRepository() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const freelancers = yield freelancer_1.FreelancerModel.find({
                isProfileCompleted: true,
            })
                .populate("skill")
                .populate("experience")
                .populate("education")
                .populate("languages")
                .populate("address")
                .exec();
            return freelancers;
        }
        catch (error) {
            console.error("Error fetching experiences by userId:", error);
            throw new Error("Error fetching experiences");
        }
    });
}
