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
const getFreelancers_1 = require("./getFreelancers");
const saveSkillsController_1 = require("./saveSkillsController");
const postProfileController_1 = require("./postProfileController");
const applyJobPost_1 = require("./applyJobPost");
const getSavedJobs_1 = require("./getSavedJobs");
const saveJob_1 = require("./saveJob");
const getFreelancerById_1 = require("./getFreelancerById");
const getInvitedFreelancers_1 = require("./getInvitedFreelancers");
const updateJobInvitesController_1 = require("./updateJobInvitesController");
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
        getFreelancers: (0, getFreelancers_1.getFreelancersController)(dependencies),
        saveCategoryAndSkill: (0, saveSkillsController_1.saveSkillsController)(dependencies),
        postProfile: (0, postProfileController_1.postProfileController)(dependencies),
        applyJobPost: (0, applyJobPost_1.applyJobPostController)(dependencies),
        getFreelancersBySkill: (0, getFreelancers_1.getFreelancersController)(dependencies),
        getSavedJobs: (0, getSavedJobs_1.getSavedJobsController)(dependencies),
        toggleSavedJob: (0, saveJob_1.saveJobController)(dependencies),
        getFreelancerId: (0, getFreelancerById_1.getFreelancerByIdController)(dependencies),
        getInvitedFreelancer: (0, getInvitedFreelancers_1.getInvitedFreelancersController)(dependencies),
        updateJobInvite: (0, updateJobInvitesController_1.updateJobInvitesController)(dependencies),
    };
};
exports.controllers = controllers;
