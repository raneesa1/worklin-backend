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
exports.locationController = void 0;
const locationValidation_1 = require("../../utils/validation/locationValidation");
const locationController = (dependencies) => {
    const { useCases: { addLocationUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { freelancerId, locationData, imageUrl } = req.body;
            console.log(imageUrl, "consoling the image url");
            if (!imageUrl) {
                res.status(400).json({
                    message: "image url is required.",
                });
                return;
            }
            // Validate incoming data
            const { error } = locationValidation_1.locationValidation.validate(locationData, {
                abortEarly: false,
            });
            if (error) {
                const message = error.details
                    .map((detail) => detail.message)
                    .join(", ");
                res.status(400).json({ message });
                return;
            }
            const updatedFreelancer = yield addLocationUseCase(dependencies).execute(freelancerId, locationData, imageUrl);
            if (!updatedFreelancer) {
                res.status(404).json({
                    message: "Freelancer not found or address could not be saved.",
                });
                return;
            }
            res.status(201).json({
                message: "Location and image updated successfully.",
                freelancer: updatedFreelancer,
            });
        }
        catch (error) {
            console.error("Error adding location and image:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.locationController = locationController;
