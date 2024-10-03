import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "../infrastructure/routes/userRoutes";
import { consumeMessages } from "../infrastructure/rabbitmq/consumer";
import { connectRabbitMQ } from "../infrastructure/rabbitmq/rabbit.config";
import { dependencies } from "../config/dependencies";
import { consumeInvites } from "../infrastructure/rabbitmq/consumeInvites";
import { setupHireInfoConsumer } from "../infrastructure/rabbitmq/consumer/hireInfoConsumer";
// import { consumeJobRequests } from "../infrastructure/rabbitmq/consumeJobRequests";

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

app.use("/", userRoutes(dependencies));

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
    await consumeMessages("userQueue", dependencies);
    await consumeInvites("inviteQueue", dependencies);
    await setupHireInfoConsumer() // Add this line
    app.listen(PORT, () => {
      console.log(`User service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
