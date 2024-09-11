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
exports.resumeController = void 0;
const resumeController = (dependencies) => {
    const { useCases: { uploadResumeUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { url, freelancerId, publicId } = req.body;
            console.log(url, freelancerId, publicId, "======??????");
            const response = yield uploadResumeUseCase(dependencies).execute(freelancerId, url, publicId);
            if (response.success) {
                return res.status(200).json({
                    success: true,
                    message: "Resume uploaded successfully",
                    url: response.url,
                    publicId: response.publicId,
                });
            }
            else {
                return res
                    .status(500)
                    .json({ success: false, message: response.message });
            }
        }
        catch (error) {
            console.error("Error in resumeController:", error);
            return res
                .status(500)
                .json({ success: false, message: "Failed to upload resume" });
        }
    });
};
exports.resumeController = resumeController;
