"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const resumeController_1 = require("./resumeController");
const addExperienceController_1 = require("./experience/addExperienceController");
const getExperienceController_1 = require("./experience/getExperienceController");
const deleteExperienceController_1 = require("./experience/deleteExperienceController");
const locationController_1 = require("./locationController");
const addEducationController_1 = require("./education/addEducationController");
const getEducationController_1 = require("./education/getEducationController");
const deleteEducationController_1 = require("./education/deleteEducationController");
const setRateBioLanguage_1 = require("./setRateBioLanguage");
const setProfileDataController_1 = require("./setProfileDataController");
const saveRoleController_1 = require("./saveRoleController");
const updateEducation_1 = require("./education/updateEducation");
const updateExperience_1 = require("./experience/updateExperience");
const getFreelancersController_1 = require("./getFreelancersController");
const saveSkillsController_1 = require("./saveSkillsController");
const postProfileController_1 = require("./postProfileController");
const applyJobPostController_1 = require("./applyJobPostController");
const getSavedJobsController_1 = require("./getSavedJobsController");
const saveJobController_1 = require("./saveJobController");
const getFreelancerByIdController_1 = require("./getFreelancerByIdController");
const getInvitedFreelancersController_1 = require("./getInvitedFreelancersController");
const updateJobInvitesController_1 = require("./updateJobInvitesController");
const getAllClientsController_1 = require("./getAllClientsController");
const getClientByIdController_1 = require("./getClientByIdController");
const AdminDashboardController_1 = require("./AdminDashboardController");
const getJobOfferHiresController_1 = require("./getJobOfferHiresController");
const controllers = (dependencies) => {
    return {
        resumeController: (0, resumeController_1.resumeController)(dependencies),
        addExperience: (0, addExperienceController_1.addExperienceController)(dependencies),
        getExperience: (0, getExperienceController_1.getExperienceController)(dependencies),
        deleteExperienceController: (0, deleteExperienceController_1.deleteExperienceController)(dependencies),
        locationController: (0, locationController_1.locationController)(dependencies),
        addEducationController: (0, addEducationController_1.addEducationController)(dependencies),
        getEducation: (0, getEducationController_1.getEducationController)(dependencies),
        deleteEducation: (0, deleteEducationController_1.deleteEducationController)(dependencies),
        setBioData: (0, setRateBioLanguage_1.setRateBioLanguageController)(dependencies),
        setProfileData: (0, setProfileDataController_1.setProfileDataController)(dependencies),
        saveRole: (0, saveRoleController_1.saveRoleController)(dependencies),
        updateEducation: (0, updateEducation_1.updateEducationController)(dependencies),
        updateExperience: (0, updateExperience_1.updateExperienceController)(dependencies),
        getFreelancers: (0, getFreelancersController_1.getFreelancersController)(dependencies),
        saveCategoryAndSkill: (0, saveSkillsController_1.saveSkillsController)(dependencies),
        postProfile: (0, postProfileController_1.postProfileController)(dependencies),
        applyJobPost: (0, applyJobPostController_1.applyJobPostController)(dependencies),
        getFreelancersBySkill: (0, getFreelancersController_1.getFreelancersController)(dependencies),
        getSavedJobs: (0, getSavedJobsController_1.getSavedJobsController)(dependencies),
        toggleSavedJob: (0, saveJobController_1.saveJobController)(dependencies),
        getFreelancerId: (0, getFreelancerByIdController_1.getFreelancerByIdController)(dependencies),
        getInvitedFreelancer: (0, getInvitedFreelancersController_1.getInvitedFreelancersController)(dependencies),
        updateJobInvite: (0, updateJobInvitesController_1.updateJobInvitesController)(dependencies),
        getAllClient: (0, getAllClientsController_1.getAllClientsController)(dependencies),
        getClientById: (0, getClientByIdController_1.getClientByIdController)(dependencies),
        getAdminDashboardData: (0, AdminDashboardController_1.AdminDashboardController)(dependencies),
        getHiresFromJobPost: (0, getJobOfferHiresController_1.getJobOfferHiresController)(dependencies)
    };
};
exports.controllers = controllers;
