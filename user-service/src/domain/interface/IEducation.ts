import mongoose from "mongoose";

export interface IEducation extends Document {
  _id?: mongoose.Types.ObjectId | string;
  userId: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  description?: string;
}
