import fs from "fs";
import path from "path";

const LOG_DIRECTORY = path.join(__dirname, "");
const LOG_FILENAME = "access.log";
const RETENTION_DAYS = 30;
const ROTATION_INTERVAL = "0 0 * * *";

function rotateLogFile(): void {
  const logFilePath = path.join(LOG_DIRECTORY, LOG_FILENAME);
  const timestamp = new Date().toISOString().split("T")[0];
  const rotatedFilename = `access-${timestamp}.log`;
  const rotatedFilePath = path.join(LOG_DIRECTORY, rotatedFilename);

  try {
    if (fs.existsSync(logFilePath)) {
      fs.renameSync(logFilePath, rotatedFilePath);
    }

    fs.writeFileSync(logFilePath, "");

    console.log(`Log file rotated to payment service ${rotatedFilename}`);
  } catch (error) {
    console.error("Error rotating log file:", error);
  }
}

// Function to delete old log files
function deleteOldLogFiles(): void {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS);

  try {
    const files = fs.readdirSync(LOG_DIRECTORY);

    files.forEach((file) => {
      if (file.startsWith("access-") && file.endsWith(".log")) {
        const filePath = path.join(LOG_DIRECTORY, file);
        const stats = fs.statSync(filePath);

        if (stats.mtime < cutoffDate) {
          fs.unlinkSync(filePath);
          console.log(`Deleted old log file: ${file}`);
        }
      }
    });
  } catch (error) {
    console.error("Error deleting old log files from payment service:", error);
  }
}

// Function to setup the cron-like scheduler
function setupLogRetentionSchedule(): void {
  setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      rotateLogFile();
      deleteOldLogFiles();
    }
  }, 60000); // Check every minute
}

// Export the functions to be used in your main application
export const logRetention = {
  rotateLogFile,
  deleteOldLogFiles,
  setupLogRetentionSchedule,
};
