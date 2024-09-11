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
exports.getJobPostController = void 0;
const getJobPostController = (dependencies) => {
    const { useCases: { getJobPostUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("hi from controller get job controller");
            const JobPosts = yield getJobPostUseCase(dependencies).execute();
            console.log(JobPosts, "consoling the JobPosts job post");
            res.status(201).json({
                message: "get Job post successfully!",
                jobPost: JobPosts,
            });
        }
        catch (error) {
            console.error("Error in creating job post controller:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
};
exports.getJobPostController = getJobPostController;
