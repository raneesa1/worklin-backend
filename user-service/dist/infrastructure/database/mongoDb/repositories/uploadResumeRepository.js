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
exports.uploadResumeRepository = uploadResumeRepository;
const freelancer_1 = require("../model/freelancer");
function uploadResumeRepository(freelancerId, resumeUrl, publicId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const freelancer = yield freelancer_1.FreelancerModel.findById(freelancerId);
            if (!freelancer) {
                throw new Error("User not found");
            }
            freelancer.resume = resumeUrl;
            freelancer.publicId = publicId; // Assuming 'resume' is the field for storing the resume URL
            yield freelancer.save();
            return {
                success: true,
                url: freelancer.resume,
                publicId: freelancer.publicId,
            };
        }
        catch (error) {
            console.error("Error saving resume URL:", error);
            return { success: false, message: error.message };
        }
    });
}
