export interface IGetEducationUseCase {
  execute(userId: string): Promise<any[] | null>;
}
