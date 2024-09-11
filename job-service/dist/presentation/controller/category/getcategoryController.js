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
exports.getAllCategoriesController = void 0;
const getAllCategoriesController = (dependencies) => {
    const { useCases: { getAllCategoriesUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';
            // Call the use case to get categories with pagination and search
            const result = yield getAllCategoriesUseCase(dependencies).execute(page, limit, search);
            // Respond with the fetched categories
            res.status(200).json({
                message: "Categories retrieved successfully!",
                categories: result.categories,
                totalCount: result.totalCount,
                currentPage: page,
                totalPages: Math.ceil(result.totalCount / limit),
            });
        }
        catch (error) {
            console.error("Error in getAllCategories controller:", error);
            res
                .status(500)
                .json({ message: error.message || "Internal Server Error" });
        }
    });
};
exports.getAllCategoriesController = getAllCategoriesController;
