import { Server as SocketIoServer, Socket } from "socket.io";
import { Server } from "http";
import { updateReadStatus } from "../infrastructure/database/mongoDb/repositories/updateReadStatus";
import { sendMessageUseCase } from "../application/useCases";
import { dependencies } from "../config/dependencies";

const socket = require("socket.io");

const connectSocketIo = (server: Server) => {
  const io: Socket = socket(server, {
    cors: {
      origin: ["http://localhost:4200"],
      credentials: true,
    },
  });

  const userSocketMap: { [key: string]: string } = {};

  io.on("connection", (socket: Socket) => {
    console.log("socket connceted");
    const userId: string = socket.handshake.query.userId as string;
    if (userId != "undefined") {
      userSocketMap[userId] = socket.id;
    }
    socket.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("join chat", (room) => {
      socket.join(room);
    });

    socket.on("read message", async (data) => {
      await updateReadStatus(data.sender, data.receiver, data.status);
      io.to(data.chatId).emit(
        "updated message",
        data.id,
        data.receiver,
        data.sender
      );
    });

    socket.on("clickView", async (data) => {
      await updateReadStatus(data.view, data.click, "read");
      socket
        .to(data.view)
        .emit("click read", data.chatIds, data.click, data.view);
    });
    socket.on("new message", async (messageData) => {
      console.log("Received new message:", messageData);
      try {
        const newMessage = await sendMessageUseCase(dependencies).execute(
          messageData
        );
        if (newMessage) {
          console.log("Broadcasting new message:", newMessage);
          io.to(messageData.chatId).emit("message received", newMessage);
        }
      } catch (error) {
        console.error("Error processing new message:", error);
      }
    });

    socket.on("join_video", (data) => {
      const senderId = userSocketMap[data.id];
      console.log("socket.on", senderId);

      io.to(senderId).emit("video received", data);
    });
    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      console.log("socket disconnected");
    });
  });
};

export default connectSocketIo;
