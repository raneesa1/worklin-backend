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
exports.saveRoleRepository = saveRoleRepository;
const freelancer_1 = require("../model/freelancer"); // Adjust path accordingly
function saveRoleRepository(role, freelancerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`Saving address for freelancer ID ${freelancerId}:`);
            const freelancer = yield freelancer_1.FreelancerModel.findById(freelancerId);
            if (!freelancer) {
                console.error(`Freelancer with ID ${freelancerId} not found.`);
                return { success: false };
            }
            freelancer.role = role;
            yield freelancer.save();
            return { success: true };
        }
        catch (error) {
            console.error("Error saving address to database:", error);
            throw error;
        }
    });
}
