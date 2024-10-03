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
Object.defineProperty(exports, "__esModule", { value: true });
const updateReadStatus_1 = require("../infrastructure/database/mongoDb/repositories/updateReadStatus");
const useCases_1 = require("../application/useCases");
const dependencies_1 = require("../config/dependencies");
const socket = require("socket.io");
const connectSocketIo = (server) => {
    const io = socket(server, {
        cors: {
            origin: ["http://localhost:4200"],
            credentials: true,
        },
    });
    const userSocketMap = {};
    const emitOnlineUsers = () => {
        console.log(Object.keys(userSocketMap), "consoling the online userssssssss");
        io.emit("onlineUsers", Object.keys(userSocketMap));
    };
    io.on("connection", (socket) => {
        console.log("socket connected");
        const userId = socket.handshake.query.userId;
        if (userId != "undefined") {
            userSocketMap[userId] = socket.id;
            console.log(userId, "consoling the user id from query");
            emitOnlineUsers();
        }
        socket.on("join chat", (room) => {
            socket.join(room);
        });
        socket.on("read message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, updateReadStatus_1.updateReadStatus)(data.sender, data.receiver, data.status);
            io.to(data.chatId).emit("updated message", data.id, data.receiver, data.sender);
        }));
        socket.on("clickView", (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, updateReadStatus_1.updateReadStatus)(data.view, data.click, "read");
            socket
                .to(data.view)
                .emit("click read", data.chatIds, data.click, data.view);
        }));
        socket.on("new message", (messageData) => __awaiter(void 0, void 0, void 0, function* () {
            // console.log("Received new message:", messageData);
            try {
                const newMessage = yield (0, useCases_1.sendMessageUseCase)(dependencies_1.dependencies).execute(messageData);
                if (newMessage) {
                    // console.log("Broadcasting new message:", newMessage);
                    io.to(messageData.chatId).emit("message received", newMessage);
                }
            }
            catch (error) {
                console.error("Error processing new message:", error);
            }
        }));
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
            emitOnlineUsers();
            console.log("socket disconnected");
        });
    });
};
exports.default = connectSocketIo;
