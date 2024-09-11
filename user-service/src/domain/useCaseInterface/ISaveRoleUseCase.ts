
export interface ISaveRoleUseCase {
  execute(role: string, freelancerId: string): Promise<{ success: boolean }>;
}
