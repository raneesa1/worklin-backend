"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const index_1 = require("../../presentation/controller/index");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const authMiddleware_1 = require("../middleware/authMiddleware");
const userRoutes = (dependencies) => {
    const { addExperience, getExperience, deleteExperienceController, locationController, addEducationController, getEducation, deleteEducation, setBioData, setProfileData, saveRole, updateEducation, updateExperience, getFreelancers, saveCategoryAndSkill, postProfile, resumeController, applyJobPost, getFreelancersBySkill, getSavedJobs, toggleSavedJob, getFreelancerId, getInvitedFreelancer, updateJobInvite, getAllClient, getClientById, getAdminDashboardData, getHiresFromJobPost, } = (0, index_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router
        .route("/addExperience")
        .post((0, authMiddleware_1.checkTokenAndRole)(["freelancer"]), addExperience);
    router.route("/addEducation").post(addEducationController);
    router
        .route("/getExperience/:userId")
        .get((0, authMiddleware_1.checkTokenAndRole)(["freelancer"]), getExperience);
    router
        .route("/getEducation/:userId")
        .get((0, authMiddleware_1.checkTokenAndRole)(["freelancer"]), getEducation);
    router.route("/updateLocation").post(locationController);
    router
        .route("/deleteExperience/:experienceId")
        .delete((0, authMiddleware_1.checkTokenAndRole)(["freelancer"]), deleteExperienceController);
    router
        .route("/deleteEducation/:educationId")
        .delete((0, authMiddleware_1.checkTokenAndRole)(["freelancer"]), deleteEducation);
    router
        .route("/setBioData")
        .post((0, authMiddleware_1.checkTokenAndRole)(["freelancer"]), setBioData);
    router.route("/profile-data").post(setProfileData);
    router.route("/saveRole").post((0, authMiddleware_1.checkTokenAndRole)(["freelancer"]), saveRole);
    router.route("/updateEducation/:educationId").patch(updateEducation);
    router.route("/updateExperience/:experienceId").patch(updateExperience);
    router.route("/getFreelancers").get(getFreelancers);
    router.route("/submit-skills-category").post(saveCategoryAndSkill);
    router.route("/editProfileFromPreview").patch(postProfile);
    router.route("/apply").post(applyJobPost);
    router.route("/freelancersBySkills").post(getFreelancersBySkill);
    router
        .route("/uploadResume")
        .post((0, authMiddleware_1.checkTokenAndRole)(["freelancer"]), resumeController);
    router.route("/toggle-save-job").post(toggleSavedJob);
    router.route("/getSavedJobs/:freelancerId").get(getSavedJobs);
    router.route("/freelancer/:freelancerId").get(getFreelancerId);
    router.route("/client/:clientId").get(getClientById);
    router.route("/getInvitedFreelancer/:jobId").get(getInvitedFreelancer);
    router.route("/updateInviteJob").post(updateJobInvite);
    router.route("/getAllClient").get((0, authMiddleware_1.checkTokenAndRole)(["admin"]), getAllClient);
    router.route("/getHires/:jobId").get(getHiresFromJobPost);
    router
        .route("/getAdminDashboardData/:timeRange")
        .get((0, authMiddleware_1.checkTokenAndRole)(["admin"]), getAdminDashboardData);
    return router;
};
exports.userRoutes = userRoutes;
