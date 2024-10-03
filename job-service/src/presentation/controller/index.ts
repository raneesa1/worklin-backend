import { IDependencies } from "../../application/interfaces/IDependencies";
import { createCategoryController } from "./category/addcategoryController";
import { deleteCategoryController } from "./category/deleteCategoryController";
import { getAllCategoryForDropDownController } from "./category/getAllCategoryControllerForDropDown";
import { getAllCategoriesController } from "./category/getcategoryController";
import { getSkillByCategoryIdController } from "./category/getSkillFromCategory";
import { createJobOfferController } from "./jobOffer/createJobOfferController";
import { updateJobOfferStatusController } from "./jobOffer/updateJobOfferStatusController";
import { getJobOfferByFreelancerIdController } from "./jobOffer/getJobOfferByFreelancerIdController";
import { createJobPostController } from "./jobPost/createJobPostController";
import { editJobPostController } from "./jobPost/editJobPostController";
import { getJobByIdController } from "./jobPost/getJobByIdController";
import { getJobInvitesController } from "./jobPost/getJobInvitesController";
import { getJobPostByClientIdController } from "./jobPost/getJobPostByClientId";
import { getJobPostController } from "./jobPost/getJobPostController";
import { inviteFreelancerController } from "./jobPost/inviteFreelancerController";
import { createSkill } from "./skill/addSkillController";
import { deleteSkill } from "./skill/deleteSkillController";
import { getSkills } from "./skill/getSkillsController";
import { updateSkill } from "./skill/updateSkillController.";
import { getJobOfferByClientIdController } from "./jobOffer/getJobOfferByClientIdController";
import { getTotalNumberOfJobPostController } from "./jobPost/getTotalNumberOfJobPostController";
import { deleteJobPostController } from "./jobPost/deleteJobPostController";

export const controllers = (dependencies: IDependencies) => {
  return {
    addSkill: createSkill(dependencies),
    deleteSkill: deleteSkill(dependencies),
    updateSkill: updateSkill(dependencies),
    getSkills: getSkills(dependencies),
    addCategory: createCategoryController(dependencies),
    getCategory: getAllCategoriesController(dependencies),
    getSkillByCategoryId: getSkillByCategoryIdController(dependencies),
    deleteCategory: deleteCategoryController(dependencies),
    createJob: createJobPostController(dependencies),
    editJob: editJobPostController(dependencies),
    getJob: getJobPostController(dependencies),
    getJobByClientId: getJobPostByClientIdController(dependencies),
    getJobPostById: getJobByIdController(dependencies),
    getAllCategoryForDropDown:
      getAllCategoryForDropDownController(dependencies),
    inviteFreelancer: inviteFreelancerController(dependencies),
    getJobInvites: getJobInvitesController(dependencies),
    createJobOffer: createJobOfferController(dependencies),
    getJobOfferByFreelancerId:
      getJobOfferByFreelancerIdController(dependencies),
    updateJobOfferStatus: updateJobOfferStatusController(dependencies),
    getJobOfferByClientId: getJobOfferByClientIdController(dependencies),
    getTotalNumberOfJobPost: getTotalNumberOfJobPostController(dependencies),
    deleteJobPost:deleteJobPostController(dependencies)
  };
};
