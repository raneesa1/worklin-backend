export interface IGetAdminDashboardUseCase {
  execute(timeRange: string): Promise<AdminDashboardData>;
}
