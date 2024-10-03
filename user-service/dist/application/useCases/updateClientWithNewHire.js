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
exports.updateClientWithNewHire = updateClientWithNewHire;
const updateClientWithNewHireRepository_1 = require("../../infrastructure/database/mongoDb/repositories/updateClientWithNewHireRepository");
function updateClientWithNewHire(hireInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, updateClientWithNewHireRepository_1.updateClientInRepository)(hireInfo.clientId, hireInfo.freelancerId, hireInfo.jobDetails);
            console.log(`Client updated with new hire: ${JSON.stringify(hireInfo)}`);
            // Optionally, send a confirmation message
        }
        catch (error) {
            console.error("Error updating client with new hire:", error);
            // Handle the error
        }
    });
}
