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
exports.getClientByIdRepository = getClientByIdRepository;
const client_1 = require("../model/client");
function getClientByIdRepository(clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(clientId, "consoling the freelancer id ");
            const client = yield client_1.ClientModel.findById(clientId).exec();
            console.log(client, "consoling the freelancer");
            if (!client) {
                throw new Error("no user found with this id");
            }
            return client;
        }
        catch (error) {
            console.error("Error fetching clientEntity by userId:", error);
            throw new Error("Error fetching clientEntity");
        }
    });
}
