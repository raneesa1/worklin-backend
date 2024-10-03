import { JobPost } from "../../domain/interface/IJobPost";
import {
  ICreateJobOfferUseCase,
  IDeleteJobPostUseCase,
  IGetAllCategoryForDropDownUseCase,
  IGetJobInvitesUseCase,
  IGetJobOfferByIdUseCase,
  IGetJobPostByClientId,
  IGetJobPostById,
  IGetTotalNumberOfJobPostUseCase,
  IInviteFreelancerUseCase,
  IJobPostUseCase,
  IProcessJobApplicationUseCase,
  IUpdateStatusJobOfferUseCase,
} from "../../domain/useCaseInterface";
import { ICreateCategoryUseCase } from "../../domain/useCaseInterface/ICreateCategoryUseCase";
import { IDeleteCategoryUseCase } from "../../domain/useCaseInterface/IDeleteCategoryUseCase";
import { IGetAllCategoriesUseCase } from "../../domain/useCaseInterface/IGetAllCategoriesUseCase";
import { IGetJobDetailsUseCase } from "../../domain/useCaseInterface/IGetJobDetailsUseCase";
import { IGetJobPostUseCase } from "../../domain/useCaseInterface/IGetJobPostUseCase";

import { IGetSkillByCategoryIdUseCase } from "../../domain/useCaseInterface/IGetSkillByCategoryIdUseCase";
import {
  ICreateSkillUseCase,
  IDeleteSkillUseCase,
  IGetSkillByIdUseCase,
  IGetSkillsUseCase,
  IUpdateSkillUseCase,
} from "../../domain/useCaseInterface/IskillUserCase";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
  createSkillUseCase: (dependencies: IDependencies) => ICreateSkillUseCase;
  deleteSkillUseCase: (dependencies: IDependencies) => IDeleteSkillUseCase;
  getSkillsUseCase: (dependencies: IDependencies) => IGetSkillsUseCase;
  updateSkillUseCase: (dependencies: IDependencies) => IUpdateSkillUseCase;
  getSkillByIdUseCase: (dependencies: IDependencies) => IGetSkillByIdUseCase;
  createCategoryUseCase: (
    dependencies: IDependencies
  ) => ICreateCategoryUseCase;
  getAllCategoriesUseCase: (
    dependencies: IDependencies
  ) => IGetAllCategoriesUseCase;

  getSkillByCategoryIdUseCase: (
    dependencies: IDependencies
  ) => IGetSkillByCategoryIdUseCase;
  deleteCategoryUseCase: (
    dependencies: IDependencies
  ) => IDeleteCategoryUseCase;
  JobPostUseCase: (dependencies: IDependencies) => IJobPostUseCase;
  editJobPostUseCase: (dependencies: IDependencies) => IJobPostUseCase;
  getJobPostUseCase: (dependencies: IDependencies) => IGetJobPostUseCase;
  getJobPostByClientIdUseCase: (
    dependencies: IDependencies
  ) => IGetJobPostByClientId;
  getJobPostByIdUseCase: (dependencies: IDependencies) => IGetJobPostById;
  processJobApplicationUseCase: (
    dependencies: IDependencies
  ) => IProcessJobApplicationUseCase;
  getJobDetailsUseCase: (dependencies: IDependencies) => IGetJobDetailsUseCase;
  getAllCategoryForDropDownUseCase: (
    dependencies: IDependencies
  ) => IGetAllCategoryForDropDownUseCase;
  inviteFreelancerUseCase: (
    dependencies: IDependencies
  ) => IInviteFreelancerUseCase;
  getJobInvitesUseCase: (dependencies: IDependencies) => IGetJobInvitesUseCase;
  createJobOfferUseCase: (
    dependencies: IDependencies
  ) => ICreateJobOfferUseCase;
  getJobOfferByFreelancerIdUseCase: (
    dependencies: IDependencies
  ) => IGetJobOfferByIdUseCase;
  acceptJobOfferUseCase: (
    dependencies: IDependencies
  ) => IUpdateStatusJobOfferUseCase;
  getJobOfferByClientIdUseCase: (
    dependencies: IDependencies
  ) => IGetJobOfferByIdUseCase;
  getTotalNumberOfJobPostUseCase: () => IGetTotalNumberOfJobPostUseCase;
  deleteJobPostUseCase: (id: string) => IDeleteJobPostUseCase
}
