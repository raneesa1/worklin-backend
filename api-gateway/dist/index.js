"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: "http://localhost:4200", // Your frontend URL
    credentials: true, // Allows credentials (cookies, authorization headers, etc.) to be included in the requests
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/auth", (0, express_http_proxy_1.default)("http://localhost:3001"));
app.use("/user", (0, express_http_proxy_1.default)("http://localhost:3002"));
app.use("/job", (0, express_http_proxy_1.default)("http://localhost:3003"));
app.use("/chat", (0, express_http_proxy_1.default)("http://localhost:3004"));
app.use("/payment", (0, express_http_proxy_1.default)("http://localhost:3005"));
app.listen(PORT, () => {
    console.log(`Gateway is listening on port: ${PORT}`);
});
