export interface BioData {
  userId: string;
  languages: {
    userId: any;
    language: string;
    proficiency: string;
  }[];
  hourlyRate: number | null;
  serviceRate: number | null;
  bio: string;
}
