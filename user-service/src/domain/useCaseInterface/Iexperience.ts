export interface IExperience extends Document {
  _id?: string;
  userId: string;
  title: string;
  company: string;
  jobLocation: string;
  country: string;
  startDate: string;
  endDate?: string;
  description: string;
  isCurrentlyWorking?: boolean;
}
