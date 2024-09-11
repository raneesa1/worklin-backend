"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
const userRoutes = (dependencies) => {
    const { sendMessage, getMessage, listAllMessage, getRoom, createRoom } = (0, controller_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.route("/sendMessage").post(sendMessage);
    router.route("/getMessage").get(getMessage);
    router.route("/listMessages").get(listAllMessage);
    router.route("/get-room").get(getRoom);
    router.route("/create-room").post(createRoom);
    return router;
};
exports.userRoutes = userRoutes;
