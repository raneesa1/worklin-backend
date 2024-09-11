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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const generateToken_1 = __importDefault(require("../../utils/jwt/generateToken"));
const loginController = (dependencies) => {
    const { useCases: { loginUserUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res
                    .status(400)
                    .json({ success: false, message: "Email and password are required" });
                return;
            }
            const user = yield loginUserUseCase(dependencies).execute({ email, password });
            if (user) {
                const userId = (_b = (_a = user._id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                const token = (0, generateToken_1.default)({
                    userId: userId,
                    userEmail: user.email,
                    firstName: user.firstName,
                    accountType: user.accountType,
                    isBlocked: user.isBlocked,
                    country: user.country,
                }, "15m");
                const refreshToken = (0, generateToken_1.default)({
                    userId: userId,
                    userEmail: user.email,
                    firstName: user.firstName,
                    accountType: user.accountType,
                    isBlocked: user.isBlocked,
                    country: user.country,
                }, "7d");
                res.cookie("auth", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 15 * 60 * 1000, // 15 minutes
                });
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });
                console.log("Cookie set from login controller:", token);
                res.status(200).json({
                    success: true,
                    user,
                    message: "Login successful",
                    token,
                    refreshToken,
                });
            }
            else {
                res
                    .status(401)
                    .json({ success: false, message: "Invalid email or password" });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.loginController = loginController;
