"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/photos");
    },
    filename: function (req, file, cb) {
        // Define the filename for your uploaded files
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});
// Middleware to handle file upload
const uploadMiddleware = (req, res, next) => {
    console.log("Incoming request to upload middleware");
    console.log("Headers:", req.headers);
    // Log raw body chunks (for debugging purposes)
    req.on("data", (chunk) => {
        console.log("Raw body chunk:", chunk.toString());
    });
    // Log the end of the request data
    req.on("end", () => {
        console.log("Request ended");
    });
    // Handle file upload with Multer
    upload.single("resume")(req, res, (err) => {
        if (err) {
            console.error("Multer middleware error:", err);
            return res
                .status(500)
                .json({ success: false, message: "File upload error" });
        }
        // Log request body and uploaded file information
        console.log("File successfully processed by multer");
        console.log("Request body:", req.body);
        console.log("Uploaded file:", req.file);
        // Proceed to the next middleware or route handler
        next();
    });
};
exports.uploadMiddleware = uploadMiddleware;
