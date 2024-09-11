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
exports.googleSignup = void 0;
const loginCredential_1 = require("../models/loginCredential");
const googleSignup = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data, "console from google signup repository");
        const newUser = yield loginCredential_1.User.create({
            email: data.email,
            accountType: data.accountType,
            picture: data.picture,
            firstName: data.name, // Assuming Google's name maps to firstName
        });
        console.log(newUser, "user created");
        console.log(newUser, "consoling the new user from the repository----------->>>>>>>>>>>>>>>");
        if (!newUser) {
            throw new Error("User creation failed!");
        }
        return {
            _id: newUser._id,
            email: newUser.email,
            firstName: newUser.firstName,
            picture: newUser.picture,
            accountType: newUser.accountType,
        };
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.googleSignup = googleSignup;
