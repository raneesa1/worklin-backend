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
exports.getSavedJobsController = void 0;
const getSavedJobsController = (dependencies) => {
    const { getSavedJobsUseCase } = dependencies.useCases;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("hi from get saved job controller");
            const { freelancerId } = req.params;
            const savedJobs = yield getSavedJobsUseCase(dependencies).execute(freelancerId);
            console.log(savedJobs, "consoling the saved jobs");
            if (!savedJobs || savedJobs.length === 0) {
                res.status(404).json({ message: "No savedJobs found" });
                return;
            }
            res.status(200).json(savedJobs);
        }
        catch (error) {
            console.error("Error getting experience of user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.getSavedJobsController = getSavedJobsController;
