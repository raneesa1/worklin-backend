import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controller/index";
import multer from "multer";
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

import { uploadMiddleware } from "../middleware/uploadMiddleware";
import { checkTokenAndRole } from "../middleware/authMiddleware";

export const userRoutes = (dependencies: IDependencies) => {
  const {
    addExperience,
    getExperience,
    deleteExperienceController,
    locationController,
    addEducationController,
    getEducation,
    deleteEducation,
    setBioData,
    setProfileData,
    saveRole,
    updateEducation,
    updateExperience,
    getFreelancers,
    saveCategoryAndSkill,
    postProfile,
    resumeController,
    applyJobPost,
    getFreelancersBySkill,
    getSavedJobs,
    toggleSavedJob,
    getFreelancerId,
    getInvitedFreelancer,
    updateJobInvite,
    getAllClient,
    getClientById,
    getAdminDashboardData,
    getHiresFromJobPost,
  } = controllers(dependencies);

  const router = Router();

  router
    .route("/addExperience")
    .post(checkTokenAndRole(["freelancer"]), addExperience);
  router.route("/addEducation").post(addEducationController);
  router
    .route("/getExperience/:userId")
    .get(checkTokenAndRole(["freelancer"]), getExperience);
  router
    .route("/getEducation/:userId")
    .get(checkTokenAndRole(["freelancer"]), getEducation);
  router.route("/updateLocation").post(locationController);
  router
    .route("/deleteExperience/:experienceId")
    .delete(checkTokenAndRole(["freelancer"]), deleteExperienceController);
  router
    .route("/deleteEducation/:educationId")
    .delete(checkTokenAndRole(["freelancer"]), deleteEducation);
  router
    .route("/setBioData")
    .post(checkTokenAndRole(["freelancer"]), setBioData);
  router.route("/profile-data").post(setProfileData);
  router.route("/saveRole").post(checkTokenAndRole(["freelancer"]), saveRole);
  router.route("/updateEducation/:educationId").patch(updateEducation);
  router.route("/updateExperience/:experienceId").patch(updateExperience);
  router.route("/getFreelancers").get(getFreelancers);
  router.route("/submit-skills-category").post(saveCategoryAndSkill);
  router.route("/editProfileFromPreview").patch(postProfile);
  router.route("/apply").post(applyJobPost);
  router.route("/freelancersBySkills").post(getFreelancersBySkill);
  router
    .route("/uploadResume")
    .post(checkTokenAndRole(["freelancer"]), resumeController);
  router.route("/toggle-save-job").post(toggleSavedJob);
  router.route("/getSavedJobs/:freelancerId").get(getSavedJobs);
  router.route("/freelancer/:freelancerId").get(getFreelancerId);
  router.route("/client/:clientId").get(getClientById);
  router.route("/getInvitedFreelancer/:jobId").get(getInvitedFreelancer);
  router.route("/updateInviteJob").post(updateJobInvite);
  router.route("/getAllClient").get(checkTokenAndRole(["admin"]), getAllClient);
  router.route("/getHires/:jobId").get(getHiresFromJobPost);
  router
    .route("/getAdminDashboardData/:timeRange")
    .get(checkTokenAndRole(["admin"]), getAdminDashboardData);

  return router;
};
