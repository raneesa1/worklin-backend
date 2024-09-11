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
exports.saveAddress = saveAddress;
const addressModel_1 = require("../model/addressModel");
const freelancer_1 = require("../model/freelancer"); // Adjust path accordingly
function saveAddress(freelancerId, location) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`Saving address for freelancer ID ${freelancerId}:`, location);
            // Find the freelancer by ID and populate all relevant fields
            const freelancer = yield freelancer_1.FreelancerModel.findById(freelancerId)
                .populate("address")
                .populate({
                path: "category",
                populate: { path: "skills" }, // Populate skills in category
            })
                .populate("education")
                .populate("experience")
                .populate("languages")
                .populate("skill")
                .exec();
            if (!freelancer) {
                console.error(`Freelancer with ID ${freelancerId} not found.`);
                return null;
            }
            location.userId = freelancerId;
            const savedAddress = yield addressModel_1.AddressModel.create(location);
            freelancer.address.push(savedAddress._id);
            freelancer.country = location.country;
            freelancer.dob = location.dob;
            yield freelancer.save();
            console.log("Address saved successfully:", savedAddress);
            // Populate the freelancer's address and other details before returning
            const updatedFreelancer = yield freelancer_1.FreelancerModel.findById(freelancerId)
                .populate("address")
                .populate({
                path: "category",
                populate: { path: "skills" }, // Populate skills in category
            })
                .populate("education")
                .populate("experience")
                .populate("languages")
                .populate("skill")
                .exec();
            return updatedFreelancer;
        }
        catch (error) {
            console.error("Error saving address to database:", error);
            throw error;
        }
    });
}
