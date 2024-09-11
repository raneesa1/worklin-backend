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
exports.deleteCategoryController = void 0;
const deleteCategoryController = (dependencies) => {
    const { useCases: { deleteCategoryUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("hi from delete delete category controller");
            const { id } = req.params;
            console.log(id, "consoling the id from delete category controller ");
            // Validate the ID parameter
            if (!id) {
                res.status(400).json({ message: "category ID is required." });
                return;
            }
            const deletedCategory = yield deleteCategoryUseCase(dependencies).execute(id);
            if (!deletedCategory) {
                res.status(404).json({ message: "Category not found." });
                return;
            }
            // Respond with a success message
            res.status(200).json({
                message: "category deleted successfully.",
                skillId: id,
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};
exports.deleteCategoryController = deleteCategoryController;
