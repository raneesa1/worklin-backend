import { IDependencies } from "../../application/interfaces/IDependencies";
import { resumeController } from "./resumeController";
import { addExperienceController } from "./experience/addExperienceController";
import { getExperienceController } from "./experience/getExperienceController";
import { deleteExperienceController } from "./experience/deleteExperienceController";
import { locationController } from "./locationController";
import { addEducationController } from "./education/addEducationController";
import { getEducationController } from "./education/getEducationController";
import { deleteEducationController } from "./education/deleteEducationController";
import { setRateBioLanguageController } from "./setRateBioLanguage";
import { setProfileDataController } from "./setProfileDataController";
import { saveRoleController } from "./saveRoleController";
import { updateEducationController } from "./education/updateEducation";
import { updateExperienceController } from "./experience/updateExperience";
import { getFreelancersController } from "./getFreelancersController";
import { saveFreelancerSkillsAndCategory } from "../../infrastructure/database/mongoDb/repositories/saveFreelancerSkillsAndCategory";
import { saveSkillsController } from "./saveSkillsController";
import { postProfileController } from "./postProfileController";
import { applyJobPostUseCase } from "../../application/useCases";
import { applyJobPostController } from "./applyJobPostController";
import { getSavedJobsController } from "./getSavedJobsController";
import { saveJobController } from "./saveJobController";
import { getFreelancerByIdController } from "./getFreelancerByIdController";
import { getInvitedFreelancersController } from "./getInvitedFreelancersController";
import { updateJobInvitesController } from "./updateJobInvitesController";
import { getAllClientsController } from "./getAllClientsController";
import { getClientByIdController } from "./getClientByIdController";
import { AdminDashboardController } from "./AdminDashboardController";
import { getJobOfferHiresController } from "./getJobOfferHiresController";

export const controllers = (dependencies: IDependencies) => {
  return {
    resumeController: resumeController(dependencies),
    addExperience: addExperienceController(dependencies),
    getExperience: getExperienceController(dependencies),
    deleteExperienceController: deleteExperienceController(dependencies),
    locationController: locationController(dependencies),
    addEducationController: addEducationController(dependencies),
    getEducation: getEducationController(dependencies),
    deleteEducation: deleteEducationController(dependencies),
    setBioData: setRateBioLanguageController(dependencies),
    setProfileData: setProfileDataController(dependencies),
    saveRole: saveRoleController(dependencies),
    updateEducation: updateEducationController(dependencies),
    updateExperience: updateExperienceController(dependencies),
    getFreelancers: getFreelancersController(dependencies),
    saveCategoryAndSkill: saveSkillsController(dependencies),
    postProfile: postProfileController(dependencies),
    applyJobPost: applyJobPostController(dependencies),
    getFreelancersBySkill: getFreelancersController(dependencies),
    getSavedJobs: getSavedJobsController(dependencies),
    toggleSavedJob: saveJobController(dependencies),
    getFreelancerId: getFreelancerByIdController(dependencies),
    getInvitedFreelancer: getInvitedFreelancersController(dependencies),
    updateJobInvite: updateJobInvitesController(dependencies),
    getAllClient: getAllClientsController(dependencies),
    getClientById: getClientByIdController(dependencies),
    getAdminDashboardData:AdminDashboardController(dependencies),
    getHiresFromJobPost:getJobOfferHiresController(dependencies)
  };
};
