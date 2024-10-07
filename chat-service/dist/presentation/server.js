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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dependencies_1 = require("../config/dependencies");
const user_routes_1 = require("../infrastructure/routes/user.routes");
const socket_1 = __importDefault(require("../socket/socket"));
const http_1 = require("http");
dotenv_1.default.config();
const logRetention_1 = require("../utils/logRetention");
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3004;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const corsOptions = {
    origin: "http://localhost:4200",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "access.log"), {
    flags: "a",
});
app.use((0, morgan_1.default)("common", {
    stream: accessLogStream,
}));
app.use("/chat", (0, user_routes_1.userRoutes)(dependencies_1.dependencies));
// app.use("/", userRoutes(dependencies));
app.use((err, req, res, next) => {
    console.error(err);
    const errorResponse = {
        errors: [{ message: (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong" }],
    };
    return res.status(500).json(errorResponse);
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const server = (0, http_1.createServer)(app);
        // Integrate Socket.io with the server
        (0, socket_1.default)(server);
        logRetention_1.logRetention.setupLogRetentionSchedule();
        // await connectRabbitMQ();
        server.listen(PORT, () => {
            console.log(`Connected to chat service on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
});
startServer();
exports.default = app;
