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
exports.getFreelancerByIdRepository = getFreelancerByIdRepository;
const freelancer_1 = require("../model/freelancer");
function getFreelancerByIdRepository(freelancerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(freelancerId, "consoling the freelancer id ");
            const freelancer = yield freelancer_1.FreelancerModel.findById(freelancerId)
                .populate("skill")
                .populate("experience")
                .populate("education")
                .populate("languages")
                .populate("address")
                .populate({
                path: "category",
                populate: {
                    path: "skills", // Populates the 'skills' field inside 'category'
                    model: "Skill", // Refers to the 'Skill' model
                },
            })
                .exec();
            console.log(freelancer, "consoling the freelancer");
            if (!freelancer) {
                throw new Error("no user found with this id");
            }
            return freelancer;
        }
        catch (error) {
            console.error("Error fetching freelancer by userId:", error);
            throw new Error("Error fetching experiences");
        }
    });
}
