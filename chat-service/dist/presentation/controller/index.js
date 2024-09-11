"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const createRoomController_1 = require("./createRoomController");
const getMessageController_1 = require("./getMessageController");
const getRoomController_1 = require("./getRoomController");
const listAllMessageController_1 = require("./listAllMessageController");
const sendMessageController_1 = require("./sendMessageController");
const controllers = (dependencies) => {
    return {
        sendMessage: (0, sendMessageController_1.sendMessageController)(dependencies),
        getMessage: (0, getMessageController_1.getMessageController)(dependencies),
        listAllMessage: (0, listAllMessageController_1.listAllMessageController)(dependencies),
        getRoom: (0, getRoomController_1.getRoomController)(dependencies),
        createRoom: (0, createRoomController_1.createRoomController)(dependencies),
    };
};
exports.controllers = controllers;
