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
exports.updateEducationController = void 0;
const updateEducationController = (dependencies) => {
    const { useCases: { updateEducationUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("hi from update education controller");
            const { educationId } = req.params;
            const updateData = req.body;
            const userId = updateData.userId;
            console.log(updateData, "consoling the updated data =?????+???????????+??????/");
            console.log(userId, "fnlekrfnlerkfnler");
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const updatedEducation = yield updateEducationUseCase(dependencies).execute(educationId, updateData, userId);
            console.log(updatedEducation, "consoling the updated education");
            if (!updatedEducation) {
                res
                    .status(404)
                    .json({ message: "Education not found or unauthorized." });
                return;
            }
            res.status(200).json({
                message: "Education updated successfully.",
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};
exports.updateEducationController = updateEducationController;
