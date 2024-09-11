export interface ISaveUserUseCase {
  execute(userData: any): Promise<void>;
}
 