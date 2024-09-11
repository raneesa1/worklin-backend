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
exports.saveRoleController = void 0;
const saveRoleController = (dependencies) => {
    const { useCases: { saveRoleUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { role, freelancerId } = req.body;
            console.log(role, "Consoling the rate data");
            // Execute the use case with the provided bioData
            const result = yield saveRoleUseCase(dependencies).execute(role, freelancerId);
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
exports.saveRoleController = saveRoleController;
