export interface IDeleteJobPostUseCase {
  execute(id: string): Promise<boolean>;
}
