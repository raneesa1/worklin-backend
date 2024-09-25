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
exports.getAdminTransactionsController = void 0;
const getAdminTransactionsController = (dependencies) => {
    const { useCases: { getAdminTransactionsUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { adminId } = req.params;
            const payments = yield getAdminTransactionsUseCase(dependencies).execute(adminId);
            console.log(adminId, 'eergege');
            res.status(200).json({
                payments,
                message: "admin transaction fetched successfully",
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};
exports.getAdminTransactionsController = getAdminTransactionsController;
