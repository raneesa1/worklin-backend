import { Category } from "../../domain/entities/category";
import { IJobOffer } from "../../domain/entities/jobOffer";
import { skillEntity } from "../../domain/entities/skillEntity";
import { IApplication } from "../../domain/interface/IApplication";
import {
  IInviteFreelancer,
  invitedFreelancerStatus,
} from "../../domain/interface/IInviteFreelancer";
import { JobPost } from "../../domain/interface/IJobPost";

export interface IRepositories {
  createSkill: (skill: skillEntity) => Promise<skillEntity>;
  findAllSkills: (skip: number, limit: number) => Promise<skillEntity[]>;
  findSkillById: (id: string) => Promise<skillEntity | null>;
  updateSkill: (
    id: string,
    skill: Partial<skillEntity>
  ) => Promise<skillEntity | null>;
  deleteSkill: (id: string) => Promise<skillEntity | null>;
  countAllSkills(): Promise<number>;
  createCategory: (category: Category) => Promise<Category>;
  getAllCategories(
    page: number,
    limit: number,
    search: string
  ): Promise<{
    categories: Category[];
    totalCount: number;
  }>;
  getAllCategoriesForDropDown(): Promise<Category[]>;
  getSkillByCategoryId(categoryId: string): Promise<skillEntity[] | null>;
  deleteCategory(categoryId: string): Promise<boolean>;
  createJobPost(jobPost: JobPost): Promise<JobPost>;
  editJobPost(jobPost: JobPost): Promise<JobPost>;
  getJobPost(): Promise<JobPost[]>;
  getJobPostByClientId(clientId: string | null): Promise<JobPost[] | null>;
  getJobPostById(jobPostId: string | null): Promise<JobPost | null>;
  updateJobPostWithApplication(
    applicationData: IApplication
  ): Promise<{ success: boolean; message: string }>;
  getJobDetailsRepository(jobIds: string[]): Promise<JobPost[]>;
  inviteFreelancerRepository(
    invitationData: IInviteFreelancer
  ): Promise<IInviteFreelancer | null>;
  getJobInvitesRepository(freelancerId: string): Promise<JobPost[] | null>;
  updateJobInviteRepository(
    jobPostId: string,
    freelancerId: string,
    status: invitedFreelancerStatus
  ): Promise<IInviteFreelancer>;
  createJobOfferRepository(jobOfferData: IJobOffer): Promise<IJobOffer>;
  getJobOfferByFreelancerIdRepository(
    freelancerId: string
  ): Promise<IJobOffer[] | null>;
  acceptJobOfferRepository(
    jobOfferId: string,
    status: string
  ): Promise<IJobOffer>;
  getJobOfferByClientIdRepository(
    freelancerId: string
  ): Promise<IJobOffer[] | null>;
  getTotalNumberOfJobPostsRepository(): Promise<number>;
  deleteJobPostRepository(id: string): Promise<boolean>;
}
