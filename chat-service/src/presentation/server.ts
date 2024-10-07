import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dependencies } from "../config/dependencies";
import { userRoutes } from "../infrastructure/routes/user.routes";
import connectSocketIo from "../socket/socket";
import { createServer } from "http";
dotenv.config();
import { logRetention } from "../utils/logRetention";
import morgan from "morgan";
import path from "path";
import fs from "fs";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3004;

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
app.use("/chat", userRoutes(dependencies));
// app.use("/", userRoutes(dependencies));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const errorResponse = {
    errors: [{ message: err?.message || "Something went wrong" }],
  };

  return res.status(500).json(errorResponse);
});

const startServer = async () => {
  try {
    const server = createServer(app);

    // Integrate Socket.io with the server
    connectSocketIo(server);
    logRetention.setupLogRetentionSchedule();

    // await connectRabbitMQ();
    server.listen(PORT, () => {
      console.log(`Connected to chat service on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
