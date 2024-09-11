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
exports.addEducationController = void 0;
const educationValidation_1 = require("../../../utils/validation/educationValidation");
const addEducationController = (dependencies) => {
    const { useCases: { addEducationUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const educationData = req.body;
            const { error } = educationValidation_1.educationValidation.validate(educationData, {
                abortEarly: false,
            });
            if (error) {
                const message = error.details
                    .map((detail) => detail.message)
                    .join(", ");
                res.status(400).json({ message: `${message}` });
                return; // Explicitly return to end the function here
            }
            console.log(educationData, "consoling the educationData data");
            const result = yield addEducationUseCase(dependencies).execute(educationData);
            res.status(201).json(result);
        }
        catch (error) {
            console.error("Error adding education:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.addEducationController = addEducationController;
