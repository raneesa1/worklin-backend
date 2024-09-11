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
exports.setRateBioLanguageRepository = setRateBioLanguageRepository;
const freelancer_1 = require("../model/freelancer");
const languages_1 = require("../model/languages");
function setRateBioLanguageRepository(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Step 1: Create or update language documents and collect their IDs
            const languageIds = yield Promise.all(data.languages.map((lang) => __awaiter(this, void 0, void 0, function* () {
                // Find existing language or create a new one
                let language = yield languages_1.languageModel
                    .findOne({
                    userId: data.userId,
                    language: lang.language,
                    proficiency: lang.proficiency,
                })
                    .exec();
                if (!language) {
                    language = new languages_1.languageModel({
                        userId: data.userId,
                        language: lang.language,
                        proficiency: lang.proficiency,
                    });
                    yield language.save();
                }
                return language._id;
            })));
            // Step 2: Update the freelancer's data
            const updateResult = yield freelancer_1.FreelancerModel.findByIdAndUpdate(data.userId, {
                $set: {
                    bio: data.bio,
                    hourlyRate: data.hourlyRate,
                    serviceRate: data.serviceRate,
                },
                $addToSet: {
                    // Ensure languages are added without duplicates
                    languages: { $each: languageIds },
                },
            }, { new: true } // Return the updated document
            ).exec();
            // Check if the update was successful
            if (updateResult) {
                return { success: true }; // Return success object
            }
            else {
                console.warn("No freelancer found with the provided ID.");
                return { success: false };
            }
        }
        catch (error) {
            console.error("Error saving bio data to database:", error);
            throw error;
        }
    });
}
