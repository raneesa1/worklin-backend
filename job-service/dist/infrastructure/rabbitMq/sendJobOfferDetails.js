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
exports.processJobOffer = processJobOffer;
const getJobOfferByIdRepository_1 = require("../database/mongoDB/repositories/getJobOfferByIdRepository");
const rabbit_config_1 = require("./rabbit.config");
function processJobOffer(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const jobOffer = yield (0, getJobOfferByIdRepository_1.getJobOfferById)(content.offerId);
        console.log(content, "consoling the content from process job offer from job service");
        if (jobOffer) {
            const hireInfo = {
                clientId: jobOffer.clientId,
                freelancerId: jobOffer.freelancerId,
                jobDetails: {
                    title: jobOffer.title,
                    description: jobOffer.description,
                    totalAmount: jobOffer.totalAmount,
                    jobOfferId: jobOffer._id,
                },
            };
            console.log(hireInfo, "consoling the hire info from job service to the user service");
            const channel = (0, rabbit_config_1.getChannel)();
            if (channel) {
                channel.publish("jobServiceExchange", "hire.info", Buffer.from(JSON.stringify(hireInfo)));
                console.log(`Hire info sent to user service: ${JSON.stringify(hireInfo)}`);
            }
        }
    });
}
