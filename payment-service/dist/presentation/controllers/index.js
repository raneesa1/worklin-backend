"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const createPaymentSessionController_1 = require("./createPaymentSessionController");
const getTransactionsByUserIdController_1 = require("./getTransactionsByUserIdController");
const controllers = (dependencies) => {
    return {
        getTransactions: (0, getTransactionsByUserIdController_1.getTransactionsByUserIdController)(dependencies),
        createPaymentSession: (0, createPaymentSessionController_1.createPaymentSessionController)(dependencies),
    };
};
exports.controllers = controllers;
