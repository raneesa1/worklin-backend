"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRetention = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const LOG_DIRECTORY = path_1.default.join(__dirname, "");
const LOG_FILENAME = "access.log";
const RETENTION_DAYS = 30;
const ROTATION_INTERVAL = "0 0 * * *";
function rotateLogFile() {
    const logFilePath = path_1.default.join(LOG_DIRECTORY, LOG_FILENAME);
    const timestamp = new Date().toISOString().split("T")[0];
    const rotatedFilename = `access-${timestamp}.log`;
    const rotatedFilePath = path_1.default.join(LOG_DIRECTORY, rotatedFilename);
    try {
        if (fs_1.default.existsSync(logFilePath)) {
            fs_1.default.renameSync(logFilePath, rotatedFilePath);
        }
        fs_1.default.writeFileSync(logFilePath, "");
        console.log(`Log file rotated to job service :${rotatedFilename}`);
    }
    catch (error) {
        console.error("Error rotating log file:", error);
    }
}
// Function to delete old log files
function deleteOldLogFiles() {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS);
    try {
        const files = fs_1.default.readdirSync(LOG_DIRECTORY);
        files.forEach((file) => {
            if (file.startsWith("access-") && file.endsWith(".log")) {
                const filePath = path_1.default.join(LOG_DIRECTORY, file);
                const stats = fs_1.default.statSync(filePath);
                if (stats.mtime < cutoffDate) {
                    fs_1.default.unlinkSync(filePath);
                    console.log(`Deleted old log file from job service: ${file}`);
                }
            }
        });
    }
    catch (error) {
        console.error("Error deleting old log files from job service:", error);
    }
}
// Function to setup the cron-like scheduler
function setupLogRetentionSchedule() {
    setInterval(() => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
            rotateLogFile();
            deleteOldLogFiles();
        }
    }, 60000); // Check every minute
}
// Export the functions to be used in your main application
exports.logRetention = {
    rotateLogFile,
    deleteOldLogFiles,
    setupLogRetentionSchedule,
};
