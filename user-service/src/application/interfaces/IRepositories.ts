import {
  authEntity,
  clientEntity,
  FreelancerEntity,
} from "../../domain/entities";
import {
  IJobInvites,
  ISavedJobs,
  JobInvitesStatus,
} from "../../domain/entities/IJobInvites";
import { IAddress } from "../../domain/interface/IAddress";
import { BioData } from "../../domain/interface/IBioData";
import { Category, Skill, SubCategory } from "../../domain/interface/ICategory";
import { IEducation } from "../../domain/interface/IEducation";
import { IProfileData } from "../../domain/interface/IProfileData";
import { IExperience } from "../../domain/entities/Iexperience";

export interface IRepositories {
  saveUserToDb: (data: authEntity) => Promise<void>;
  addExperience(
    experience: IExperience,
    userId: string
  ): Promise<IExperience | null>;
  findExperienceByUserId(userId: string): Promise<any[] | null>;
  deleteExperienceById(experienceId: string): Promise<{ success: boolean }>;
  saveAddress(
    freelancerId: string,
    location: IAddress
  ): Promise<FreelancerEntity | null>;
  saveProfileImage(freelancerId: string, imageUrl: string): Promise<boolean>;
  addEducation(
    experience: IEducation,
    userId: string
  ): Promise<IEducation | null>;
  getEducation(userId: string): Promise<any[] | null>;
  deleteEducationById(experienceId: string): Promise<{ success: boolean }>;
  setRateBioLanguageRepository(data: BioData): Promise<{ success: boolean }>;
  setProfileDataRepository(
    profileData: IProfileData
  ): Promise<{ success: boolean }>;
  saveFreelancerSkillsAndCategory(
    freelancerId: string,
    category: Category,
    subcategories: SubCategory[],
    skills: Skill[]
  ): Promise<void>;
  saveRoleRepository(
    role: string,
    freelancerId: string
  ): Promise<{ success: boolean }>;
  updateEducation(
    id: string,
    data: Partial<IEducation>,
    userId: string
  ): Promise<IEducation | null>;
  updateExperience(
    id: string,
    data: Partial<IExperience>,
    userId: string
  ): Promise<{ success: boolean }>;
  getFreelancersRepository(): Promise<FreelancerEntity[] | null>;
  postProfileRepository(
    freelancer: FreelancerEntity
  ): Promise<FreelancerEntity | null>;
  uploadResumeRepository(
    freelancerId: string,
    resumeUrl: string,
    publicId: string
  ): Promise<{
    success: boolean;
    message?: string;
    url?: string;
    publicId?: string;
  }>;
  applyJobPostRepository(
    userId: string,
    jobPostId: string
  ): Promise<FreelancerEntity | null>;
  getFreelancersBySkillRepository(
    skills: string[]
  ): Promise<FreelancerEntity[] | null>;

  saveJobRepository(jobData: ISavedJobs): Promise<{ success: boolean }>;
  getSavedJobsRepository(freelancerId: string): Promise<ISavedJobs[] | null>;
  removeSavedJobRepository(
    jobId: string,
    freelancerId: string
  ): Promise<{ success: boolean }>;
  getFreelancerByIdRepository(
    freelancerId: string
  ): Promise<FreelancerEntity | null>;
  jobInvitesRepository(inviteData: IJobInvites): Promise<IJobInvites | null>;
  getInvitedFreelancersRepository(
    jobId: string
  ): Promise<Array<{ freelancer: FreelancerEntity; status: string }> | null>;
  updateJobInviteRepository(
    freelancerId: string,
    jobId: string,
    status: JobInvitesStatus
  ): Promise<FreelancerEntity | null>;
  getAllClientsRepository(): Promise<clientEntity[] | null>;
  getClientByIdRepository(clientId: string): Promise<clientEntity | null>;
  getAdminDashboardDataRepository(
    timeRange: string
  ): Promise<AdminDashboardData>;
  getJobOfferHiresRepository(
    jobId: string
  ): Promise<Array<{ freelancer: FreelancerEntity }>>;
}
