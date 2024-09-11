"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobInvitesStatus = void 0;
var JobInvitesStatus;
(function (JobInvitesStatus) {
    JobInvitesStatus["received"] = "received";
    JobInvitesStatus["accepted"] = "accepted";
    JobInvitesStatus["rejected"] = "rejected";
})(JobInvitesStatus || (exports.JobInvitesStatus = JobInvitesStatus = {}));
var savedJobStatus;
(function (savedJobStatus) {
    savedJobStatus["active"] = "active";
    savedJobStatus["stopped"] = "stopped";
    savedJobStatus["draft"] = "draft";
})(savedJobStatus || (savedJobStatus = {}));
