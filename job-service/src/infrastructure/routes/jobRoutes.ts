import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controller/index";
import { checkTokenAndRole } from "../middleware/authMiddleware";

export const skillRoutes = (dependencies: IDependencies) => {
  const {
    addSkill,
    deleteSkill,
    updateSkill,
    getSkills,
    addCategory,
    getCategory,
    getSkillByCategoryId,
    deleteCategory,
    createJob,
    editJob,
    getJobByClientId,
    getJob,
    getJobPostById,
    getAllCategoryForDropDown,
    inviteFreelancer,
    getJobInvites,
    createJobOffer,
    getJobOfferByFreelancerId,
    updateJobOfferStatus,
    getJobOfferByClientId,
    getTotalNumberOfJobPost,
    deleteJobPost,
  } = controllers(dependencies);

  const router = Router();

  router.route("/addskill").post(addSkill);
  router.route("/deleteSkill/:id").delete(deleteSkill);
  router.route("/deleteCategory/:id").delete(deleteCategory);
  router.route("/update/:id").post(updateSkill);
  router.route("/skills").get(getSkills);
  router.route("/addCategory").post(checkTokenAndRole(["admin"]), addCategory);
  router.route("/getCategory").get(getCategory);
  router.route("/categories/:categoryId/skills").get(getSkillByCategoryId);
  router.route("/jobPost").post(createJob);
  router.route("/editPost").patch(editJob);
  router.route("/getJobPost").get(getJob);
  router.route("/getJobPost/:jobPostId").get(getJobPostById);
  router
    .route("/getJobPostById/:clientId")
    .get(checkTokenAndRole(["client"]), getJobByClientId);
  router.route("/get-all-category").get(getAllCategoryForDropDown);
  router
    .route("/invite-freelancer")
    .post(checkTokenAndRole(["client"]), inviteFreelancer);
  router.route("/job-invites/:freelancerId").get(getJobInvites);
  router.route("/createJobOffer").post(createJobOffer);
  router.route("/getOffers/:freelancerId").get(getJobOfferByFreelancerId);
  router.route("/getClientOffers/:clientId").get(getJobOfferByClientId);
  router.route("/update-status").patch(updateJobOfferStatus);
  router.route("/getTotalNumberOfJobPost").get(getTotalNumberOfJobPost);
  router.route("/deleteJobPost").patch(deleteJobPost);

  return router;
};
