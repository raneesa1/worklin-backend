import { IProfileData } from "../../domain/interface/IProfileData";
import {
  IAddEducationUseCase,
  IAddExperienceUseCase,
  IAddLocationUseCase,
  IApplyJobPostUseCase,
  IDeleteEducationById,
  IDeleteExperienceById,
  IGetAllClientsUseCase,
  IGetClientByIdUseCase,
  IGetEducationUseCase,
  IGetExperienceUseCase,
  IGetFreelancerByIdUseCase,
  IGetFreelancersUseCase,
  IGetInvitedFreelancersUseCase,
  IGetSavedJobsUseCase,
  IPostProfileUseCase,
  IProcessInviteUseCase,
  IRemoveSavedJobUseCase,
  ISaveJobUseCase,
  ISaveUserUseCase,
  ISetBioData,
  ISetProfileDataUseCase,
  IUpdateEducationUseCase,
  IUpdateExperienceUseCase,
  IUpdateJobInvitesUseCase,
  IUploadResumeUseCase,
} from "../../domain/useCaseInterface";
import { IGetFreelancersBySkillUseCase } from "../../domain/useCaseInterface/IGetFreelancersBySkillUseCase";
import { ISaveFreelancerSkillsUseCase } from "../../domain/useCaseInterface/ISaveFreelancerSkillsUseCase";
import { ISaveRoleUseCase } from "../../domain/useCaseInterface/ISaveRoleUseCase";

import { IDependencies } from "./IDependencies";

export interface IUseCases {
  saveAuthDetails: (dependecies: IDependencies) => ISaveUserUseCase;
  addExperienceUseCase: (dependencies: IDependencies) => IAddExperienceUseCase;
  getUserExperienceUseCase: (
    dependencies: IDependencies
  ) => IGetExperienceUseCase;
  deleteUserExperienceUseCase: (
    dependencies: IDependencies
  ) => IDeleteExperienceById;
  addLocationUseCase: (dependencies: IDependencies) => IAddLocationUseCase;
  addEducationUseCase: (dependencies: IDependencies) => IAddEducationUseCase;
  getUserEducationUseCase: (
    Dependencies: IDependencies
  ) => IGetEducationUseCase;
  deleteEducationUseCase: (dependencies: IDependencies) => IDeleteEducationById;
  setRateBioLanguageUseCase: (Dependencies: IDependencies) => ISetBioData;
  setProfileDataUseCase: (
    Dependencies: IDependencies
  ) => ISetProfileDataUseCase;
  SaveFreelancerSkillsUseCase: (
    Dependencies: IDependencies
  ) => ISaveFreelancerSkillsUseCase;
  saveRoleUseCase: (Dependencies: IDependencies) => ISaveRoleUseCase;
  updateEducationUseCase: (
    dependencies: IDependencies
  ) => IUpdateEducationUseCase;
  updateExperienceUseCase: (
    dependencies: IDependencies
  ) => IUpdateExperienceUseCase;
  getFreelancersUseCase: (
    dependencies: IDependencies
  ) => IGetFreelancersUseCase;
  postProfileUseCase: (dependencies: IDependencies) => IPostProfileUseCase;
  uploadResumeUseCase: (dependencies: IDependencies) => IUploadResumeUseCase;
  applyJobPostUseCase: (dependencies: IDependencies) => IApplyJobPostUseCase;
  getFreelancersBySkillUseCase: (
    dependencies: IDependencies
  ) => IGetFreelancersBySkillUseCase;
  saveJobUseCase: (dependencies: IDependencies) => ISaveJobUseCase;
  getSavedJobsUseCase: (dependencies: IDependencies) => IGetSavedJobsUseCase;
  removeSavedJobUseCase: (
    dependencies: IDependencies
  ) => IRemoveSavedJobUseCase;
  getFreelancerByIdUseCase: (
    dependencies: IDependencies
  ) => IGetFreelancerByIdUseCase;
  getClientByIdUseCase: (
    dependencies: IDependencies
  ) => IGetClientByIdUseCase
  processInviteUseCase: (dependencies: IDependencies) => IProcessInviteUseCase;
  getInvitedFreelancersUseCase: (
    dependencies: IDependencies
  ) => IGetInvitedFreelancersUseCase;
  updateJobInvitesUseCase: (
    dependencies: IDependencies
  ) => IUpdateJobInvitesUseCase;
  getAllClientsUseCase: (dependencies: IDependencies) => IGetAllClientsUseCase;
}
