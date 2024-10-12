import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { getChannel } from "../infrastructure/rabbitMq/rabbit.config";
import { paymentRoutes } from "../infrastructure/routes/paymentRoutes";
import { dependencies } from "../config/dependencies";
import { consumePaymentData } from "../infrastructure/rabbitMq/paymentConsumer";
import { schedulePaymentStatusUpdates } from "../infrastructure/database/mongoDB/model/paymentModel";
import { paymentWebhookController } from "./controllers/paymentWebhookController";
import { logRetention } from "../utils/logRetention";
import morgan from "morgan";
import path from "path";
import fs from "fs";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3005;

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.originalUrl,'conosling the original url ')
  if (req.originalUrl === "/payment/webhook") {
    express.raw({ type: "application/json" })(req, res, next);
  } else {
    express.json()(req, res, next);
  }
});

app.post("/payment/webhook", paymentWebhookController(dependencies));

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/", paymentRoutes(dependencies));
app.use("/payment", paymentRoutes(dependencies));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const errorResponse = {
    errors: [{ message: err?.message || "Something went wrong" }],
  };

  return res.status(500).json(errorResponse);
});

const startServer = async () => {
  try {
    await getChannel();
    await consumePaymentData(dependencies);
    schedulePaymentStatusUpdates();
    logRetention.setupLogRetentionSchedule();

    app.listen(PORT, () => {
      console.log(`payment service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
