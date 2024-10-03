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
exports.deleteJobPostRepository = deleteJobPostRepository;
const job_post_model_1 = require("../model/job-post.model");
function deleteJobPostRepository(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield job_post_model_1.JobPostModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
            if (result) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.error("Error deleting skill:", error);
            throw error;
        }
    });
}
