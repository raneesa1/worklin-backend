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
    socket.on("initiate_call", ({ callerId, receiverId, callerName }) => {
      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("incoming_call", { callerId, callerName });
      }
    });

    socket.on("call_accepted", ({ callerId, accepterId, roomID }) => {
      const callerSocketId = userSocketMap[callerId];
      if (callerSocketId) {
        io.to(callerSocketId).emit("call_accepted", { accepterId, roomID });
      }
    });

    socket.on("call_rejected", ({ callerId, rejecterId }) => {
      const callerSocketId = userSocketMap[callerId];
      if (callerSocketId) {
        io.to(callerSocketId).emit("call_rejected", { rejecterId });
      }
    });

    socket.on("end_call", ({ callerId, receiverId }) => {
      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("call_ended", { callerId });
      }
    });

    socket.on("join_video_room", ({ roomID, userId }) => {
      socket.join(roomID);
      socket.to(roomID).emit("user_joined", { userId });
    });

    socket.on("leave_video_room", ({ roomID, userId }) => {
      socket.leave(roomID);
      socket.to(roomID).emit("user_left", { userId });
    });

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      console.log("socket disconnected");
    });
  });
};

export default connectSocketIo;
