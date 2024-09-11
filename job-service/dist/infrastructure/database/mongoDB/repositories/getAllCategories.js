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
exports.getAllCategories = void 0;
const categoryModel_1 = require("../model/categoryModel");
const getAllCategories = (page, limit, search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * limit;
        const query = search ? { name: { $regex: search, $options: "i" } } : {};
        const [categories, totalCount] = yield Promise.all([
            categoryModel_1.CategoryModel.find(query).skip(skip).limit(limit).lean().exec(),
            categoryModel_1.CategoryModel.countDocuments(query),
        ]);
        return { categories, totalCount };
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
});
exports.getAllCategories = getAllCategories;
