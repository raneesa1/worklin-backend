import { ISavedJobs } from "../entities/IJobInvites";

export interface ISaveJobUseCase {
  execute(jobData:ISavedJobs): Promise<{ success: boolean }>;
}
