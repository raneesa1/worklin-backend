"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const addcategoryController_1 = require("./category/addcategoryController");
const deleteCategoryController_1 = require("./category/deleteCategoryController");
const getAllCategoryControllerForDropDown_1 = require("./category/getAllCategoryControllerForDropDown");
const getcategoryController_1 = require("./category/getcategoryController");
const getSkillFromCategory_1 = require("./category/getSkillFromCategory");
const createJobOfferController_1 = require("./jobOffer/createJobOfferController");
const updateJobOfferStatusController_1 = require("./jobOffer/updateJobOfferStatusController");
const getJobOfferByFreelancerIdController_1 = require("./jobOffer/getJobOfferByFreelancerIdController");
const createJobPostController_1 = require("./jobPost/createJobPostController");
const editJobPostController_1 = require("./jobPost/editJobPostController");
const getJobByIdController_1 = require("./jobPost/getJobByIdController");
const getJobInvitesController_1 = require("./jobPost/getJobInvitesController");
const getJobPostByClientId_1 = require("./jobPost/getJobPostByClientId");
const getJobPostController_1 = require("./jobPost/getJobPostController");
const inviteFreelancerController_1 = require("./jobPost/inviteFreelancerController");
const addSkillController_1 = require("./skill/addSkillController");
const deleteSkillController_1 = require("./skill/deleteSkillController");
const getSkillsController_1 = require("./skill/getSkillsController");
const updateSkillController_1 = require("./skill/updateSkillController.");
const getJobOfferByClientIdController_1 = require("./jobOffer/getJobOfferByClientIdController");
const getTotalNumberOfJobPostController_1 = require("./jobPost/getTotalNumberOfJobPostController");
const deleteJobPostController_1 = require("./jobPost/deleteJobPostController");
const controllers = (dependencies) => {
    return {
        addSkill: (0, addSkillController_1.createSkill)(dependencies),
        deleteSkill: (0, deleteSkillController_1.deleteSkill)(dependencies),
        updateSkill: (0, updateSkillController_1.updateSkill)(dependencies),
        getSkills: (0, getSkillsController_1.getSkills)(dependencies),
        addCategory: (0, addcategoryController_1.createCategoryController)(dependencies),
        getCategory: (0, getcategoryController_1.getAllCategoriesController)(dependencies),
        getSkillByCategoryId: (0, getSkillFromCategory_1.getSkillByCategoryIdController)(dependencies),
        deleteCategory: (0, deleteCategoryController_1.deleteCategoryController)(dependencies),
        createJob: (0, createJobPostController_1.createJobPostController)(dependencies),
        editJob: (0, editJobPostController_1.editJobPostController)(dependencies),
        getJob: (0, getJobPostController_1.getJobPostController)(dependencies),
        getJobByClientId: (0, getJobPostByClientId_1.getJobPostByClientIdController)(dependencies),
        getJobPostById: (0, getJobByIdController_1.getJobByIdController)(dependencies),
        getAllCategoryForDropDown: (0, getAllCategoryControllerForDropDown_1.getAllCategoryForDropDownController)(dependencies),
        inviteFreelancer: (0, inviteFreelancerController_1.inviteFreelancerController)(dependencies),
        getJobInvites: (0, getJobInvitesController_1.getJobInvitesController)(dependencies),
        createJobOffer: (0, createJobOfferController_1.createJobOfferController)(dependencies),
        getJobOfferByFreelancerId: (0, getJobOfferByFreelancerIdController_1.getJobOfferByFreelancerIdController)(dependencies),
        updateJobOfferStatus: (0, updateJobOfferStatusController_1.updateJobOfferStatusController)(dependencies),
        getJobOfferByClientId: (0, getJobOfferByClientIdController_1.getJobOfferByClientIdController)(dependencies),
        getTotalNumberOfJobPost: (0, getTotalNumberOfJobPostController_1.getTotalNumberOfJobPostController)(dependencies),
        deleteJobPost: (0, deleteJobPostController_1.deleteJobPostController)(dependencies)
    };
};
exports.controllers = controllers;
