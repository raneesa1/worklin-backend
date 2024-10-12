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
const client_1 = require("../model/client");
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
            if (freelancer) {
                console.log(freelancer, "Freelancer found");
                return freelancer;
            }
            // If no freelancer found, check if the user is a client
            console.log("No freelancer found, checking for client...");
            const client = yield client_1.ClientModel.findById(freelancerId).exec();
            if (client) {
                console.log(client, "Client found");
                return client;
            }
            throw new Error("No user found with this ID");
        }
        catch (error) {
            console.error("Error fetching user by ID:", error);
            throw new Error("Error fetching user");
        }
    });
}
