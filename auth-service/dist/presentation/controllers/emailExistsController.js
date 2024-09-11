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
exports.emailExistsController = void 0;
const emailExistsController = (dependencies) => {
    const { useCases: { findUserByEmailUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.query;
            console.log(email, 'consoling the query from email  controller');
            const existingUser = yield findUserByEmailUseCase(dependencies).execute(email);
            console.log(existingUser, 'consoling existing user from email validation backend');
            if (existingUser) {
                res.status(200).json({ exists: true });
            }
            else {
                res.status(200).json({ exists: false });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.emailExistsController = emailExistsController;
