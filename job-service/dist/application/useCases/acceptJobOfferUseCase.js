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
exports.acceptJobOfferUseCase = void 0;
const jobOffer_1 = require("../../domain/entities/jobOffer");
const sendPaymentToQueue_1 = require("../../infrastructure/rabbitMq/sendPaymentToQueue");
const mileStoneModel_1 = require("../../infrastructure/database/mongoDB/model/mileStoneModel");
const acceptJobOfferUseCase = (dependencies) => {
    const { repositories } = dependencies;
    const createTransaction = (jobOffer, sender, receiver, amount, dueDate, milestoneId) => {
        if (!jobOffer._id) {
            throw new Error("Job offer ID is undefined");
        }
        return {
            offerId: jobOffer._id.toString(),
            contractTitle: jobOffer.title,
            sender,
            receiver,
            status: "issued",
            totalAmount: amount,
            dueDate,
            milestoneId,
        };
    };
    const sendTransactionToPaymentService = (transaction) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, sendPaymentToQueue_1.sendPaymentToQueue)(transaction);
            console.log(`Transaction sent to payment service for offerId: ${transaction.offerId}${transaction.milestoneId
                ? `, milestoneId: ${transaction.milestoneId}`
                : ""}, dueDate: ${transaction.dueDate.toISOString()}`);
        }
        catch (error) {
            console.error(`Error sending transaction to payment service: ${error}`);
            throw new Error("Failed to send transaction to payment service");
        }
    });
    const processPayment = (jobOffer, amount, dueDate, milestoneId) => __awaiter(void 0, void 0, void 0, function* () {
        const adminId = process.env.ADMIN_ID;
        console.log(adminId, "consoling the admin id from accept job offer");
        if (!adminId) {
            throw new Error("Admin ID is not configured");
        }
        // Client to Admin transaction
        const clientToAdminTransaction = createTransaction(jobOffer, {
            accountType: "client",
            senderId: jobOffer.clientId.toString(),
        }, {
            accountType: "admin",
            receiverId: adminId,
        }, amount, dueDate, milestoneId);
        yield sendTransactionToPaymentService(clientToAdminTransaction);
        // Admin to Freelancer transaction
        const adminToFreelancerTransaction = createTransaction(jobOffer, {
            accountType: "admin",
            senderId: adminId,
        }, {
            accountType: "freelancer",
            receiverId: jobOffer.freelancerId.toString(),
        }, amount, dueDate, milestoneId);
        yield sendTransactionToPaymentService(adminToFreelancerTransaction);
    });
    return {
        execute: (jobOfferId, status) => __awaiter(void 0, void 0, void 0, function* () {
            const jobOffer = yield repositories.acceptJobOfferRepository(jobOfferId, status);
            if (status === jobOffer_1.offerStatus.accepted) {
                if (jobOffer.paymentOption === jobOffer_1.paymentOption.mileStone) {
                    const milestones = yield mileStoneModel_1.MileStoneModel.find({
                        _id: { $in: jobOffer.mileStone },
                    });
                    for (const milestone of milestones) {
                        if (!milestone.dueDate) {
                            throw new Error(`Milestone ${milestone._id} is missing a due date`);
                        }
                        yield processPayment(jobOffer, milestone.amount, milestone.dueDate, milestone._id.toString());
                    }
                }
                else {
                    // For non-milestone payments, use the dueDate from the job offer
                    if (!jobOffer.dueDate) {
                        throw new Error("Due date is required for non-milestone payments");
                    }
                    yield processPayment(jobOffer, jobOffer.totalAmount, jobOffer.dueDate);
                }
            }
            return jobOffer;
        }),
    };
};
exports.acceptJobOfferUseCase = acceptJobOfferUseCase;
