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
exports.updateClientInRepository = updateClientInRepository;
const client_1 = require("../model/client");
const freelancer_1 = require("../model/freelancer");
const hireModel_1 = require("../model/hireModel");
function updateClientInRepository(clientId, freelancerId, jobDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        // Step 1: Find the client by their ID
        const client = yield client_1.ClientModel.findById(clientId);
        if (!client) {
            throw new Error("Client not found");
        }
        // Step 2: Find the freelancer by their ID
        const freelancer = yield freelancer_1.FreelancerModel.findById(freelancerId);
        if (!freelancer) {
            throw new Error("Freelancer not found");
        }
        // Step 3: Create a new Hire document with freelancer's details and jobDetails
        const hire = new hireModel_1.HireModel({
            client: clientId,
            freelancer: freelancerId,
            jobDetails,
            freelancerName: freelancer.firstName, // You can customize the structure of this object
            hireDate: new Date(),
        });
        // Step 4: Save the Hire document
        yield hire.save();
        client.hires.push(hire._id);
        yield client.save();
        return {
            message: "Hire successfully created and added to client",
            hire,
        };
    });
}
