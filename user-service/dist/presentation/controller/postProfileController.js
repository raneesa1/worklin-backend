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
exports.postProfileController = void 0;
const postProfileController = (dependencies) => {
    const { useCases: { postProfileUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Extract the data from the request body
            const profileData = req.body;
            console.log(profileData, "Consoling the rate data");
            // Execute the use case with the provided bioData
            const result = yield postProfileUseCase(dependencies).execute(profileData);
            // Send a successful response
            res.status(201).json(result);
        }
        catch (error) {
            // Log and handle errors
            console.error("Error setting the bio data:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.postProfileController = postProfileController;
