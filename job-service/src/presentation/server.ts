import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { skillRoutes } from "../infrastructure/routes/jobRoutes";
import { dependencies } from "../config/dependencies";
import { connectRabbitMQ } from "../infrastructure/rabbitMq/rabbit.config";
import { consumeJobApplications } from "../infrastructure/rabbitMq/consumer";
import { consumeJobInviteUpdates } from "../infrastructure/rabbitMq/consumeJobInviteUpdates";
import { scheduleOfferDeletion } from "../infrastructure/database/mongoDB/model/jobOfferModel";
import { setupPaymentConfirmationConsumer } from "../infrastructure/rabbitMq/consumers/paymentConfirmationConsumer";
// import { consumeJobRequests } from "../infrastructure/rabbitMq/consumeJobRequests";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { logRetention } from "../utils/logRetention";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
};

app.use(cors(corsOptions));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);

app.use(
  morgan("common", {
    stream: accessLogStream,
  })
);

// app.use("/", skillRoutes(dependencies));
app.use("/job", skillRoutes(dependencies));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const errorResponse = {
    errors: [{ message: err?.message || "Something went wrong" }],
  };

  return res.status(500).json(errorResponse);
});

const startServer = async () => {
  try {
    await connectRabbitMQ();
    await consumeJobApplications("jobApplicationQueue", dependencies);
    await consumeJobInviteUpdates("jobApplicationQueue", dependencies);
    await setupPaymentConfirmationConsumer();
    scheduleOfferDeletion();
    logRetention.setupLogRetentionSchedule();

    app.listen(PORT, () => {
      console.log(`Job service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
