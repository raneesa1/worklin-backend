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
exports.createCategoryController = void 0;
const mongoose_1 = require("mongoose");
const createCategoryController = (dependencies) => {
    const { useCases: { createCategoryUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body, "consoling the req/body from create category controller");
            const { name, description, subcategories, skills } = req.body;
            // Basic validation
            if (!name || !description || !subcategories || !skills) {
                res.status(400).json({ message: "All fields are required." });
                return;
            }
            // Convert skill IDs to ObjectId
            const skillObjectIds = skills.map((skill) => new mongoose_1.Types.ObjectId(skill));
            // Create a new category entity
            const categoryData = {
                name,
                description,
                subcategories,
                skills: skillObjectIds,
            };
            console.log(categoryData, "consoling the category data before sending to the use case");
            // Call the use case to create the category
            const category = yield createCategoryUseCase(dependencies).execute(categoryData);
            // Respond with the created category
            res.status(201).json({
                message: "Category created successfully!",
                category,
            });
        }
        catch (error) {
            console.error("Error in createCategory controller:", error);
            res
                .status(500)
                .json({ message: error.message || "Internal Server Error" });
        }
    });
};
exports.createCategoryController = createCategoryController;
