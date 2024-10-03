"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillRoutes = void 0;
const express_1 = require("express");
const index_1 = require("../../presentation/controller/index");
const authMiddleware_1 = require("../middleware/authMiddleware");
const skillRoutes = (dependencies) => {
    const { addSkill, deleteSkill, updateSkill, getSkills, addCategory, getCategory, getSkillByCategoryId, deleteCategory, createJob, editJob, getJobByClientId, getJob, getJobPostById, getAllCategoryForDropDown, inviteFreelancer, getJobInvites, createJobOffer, getJobOfferByFreelancerId, updateJobOfferStatus, getJobOfferByClientId, getTotalNumberOfJobPost, deleteJobPost, } = (0, index_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.route("/addskill").post(addSkill);
    router.route("/deleteSkill/:id").delete(deleteSkill);
    router.route("/deleteCategory/:id").delete(deleteCategory);
    router.route("/update/:id").post(updateSkill);
    router.route("/skills").get(getSkills);
    router.route("/addCategory").post((0, authMiddleware_1.checkTokenAndRole)(["admin"]), addCategory);
    router.route("/getCategory").get(getCategory);
    router.route("/categories/:categoryId/skills").get(getSkillByCategoryId);
    router.route("/jobPost").post(createJob);
    router.route("/editPost").patch(editJob);
    router.route("/getJobPost").get(getJob);
    router.route("/getJobPost/:jobPostId").get(getJobPostById);
    router
        .route("/getJobPostById/:clientId")
        .get((0, authMiddleware_1.checkTokenAndRole)(["client"]), getJobByClientId);
    router.route("/get-all-category").get(getAllCategoryForDropDown);
    router
        .route("/invite-freelancer")
        .post((0, authMiddleware_1.checkTokenAndRole)(["client"]), inviteFreelancer);
    router.route("/job-invites/:freelancerId").get(getJobInvites);
    router.route("/createJobOffer").post(createJobOffer);
    router.route("/getOffers/:freelancerId").get(getJobOfferByFreelancerId);
    router.route("/getClientOffers/:clientId").get(getJobOfferByClientId);
    router.route("/update-status").patch(updateJobOfferStatus);
    router.route("/getTotalNumberOfJobPost").get(getTotalNumberOfJobPost);
    router.route("/deleteJobPost").patch(deleteJobPost);
    return router;
};
exports.skillRoutes = skillRoutes;
