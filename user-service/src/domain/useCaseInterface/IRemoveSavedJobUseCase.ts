export interface IRemoveSavedJobUseCase {
  execute(jobId: string, freelancerId: string): Promise<{ success: boolean }>;
}
