

export interface IDeleteEducationById {
  execute(educationId: string): Promise<{ success: boolean }>;
}
