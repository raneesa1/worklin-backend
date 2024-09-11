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
exports.saveUserToDb = saveUserToDb;
const adminModel_1 = require("../model/adminModel");
const client_1 = require("../model/client"); // Adjust path accordingly
const freelancer_1 = require("../model/freelancer"); // Adjust path accordingly
function saveUserToDb(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(userData, 'consoling the user data from the repo of user serviceeeeeeeeeeeeeeeeeeee>>>>>>>>>>>>>>');
            // Assuming userData has the necessary fields to create a user
            if (userData.accountType === "client") {
                yield client_1.ClientModel.create(userData);
                console.log("Client data saved to database:", userData);
            }
            else if (userData.accountType === "freelancer") {
                yield freelancer_1.FreelancerModel.create(userData);
                console.log("Freelancer data saved to database:", userData);
            }
            else if (userData.accountType === "admin") {
                yield adminModel_1.AdminModel.create(userData);
                console.log("Freelancer data saved to database:", userData);
            }
        }
        catch (error) {
            console.error("Error saving user data to database:", error);
            throw error;
        }
    });
}
