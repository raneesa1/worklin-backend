"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentType = exports.offerStatus = exports.paymentOption = void 0;
var paymentOption;
(function (paymentOption) {
    paymentOption["oneTime"] = "oneTime";
    paymentOption["mileStone"] = "mileStone";
})(paymentOption || (exports.paymentOption = paymentOption = {}));
var offerStatus;
(function (offerStatus) {
    offerStatus["pending"] = "pending";
    offerStatus["accepted"] = "accepted";
    offerStatus["rejected"] = "rejected";
})(offerStatus || (exports.offerStatus = offerStatus = {}));
var paymentType;
(function (paymentType) {
    paymentType["hourly"] = "hourly";
    paymentType["fixed"] = "fixed";
})(paymentType || (exports.paymentType = paymentType = {}));
