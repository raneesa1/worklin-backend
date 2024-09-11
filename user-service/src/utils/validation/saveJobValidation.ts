// src/validations/jobValidation.ts
import Joi from "joi";

// Define the Joi schema for validating job data
export const jobDataSchema = Joi.object({
  freelancerId: Joi.string().required(),
  clientId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.string().required(),
  experience: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).required(),
  priceFrom: Joi.number().required(),
  priceTo: Joi.number().required(),
  rate: Joi.string().required(),
  jobId: Joi.string().required(),
  isActive: Joi.boolean(),
  status: Joi.string().valid("active", "stopped", "draft").default("active"),
  hires: Joi.number().optional(),
  applications: Joi.number().optional(),
  location: Joi.string().optional().allow(''),
  createdAt: Joi.date().optional(),
});

export const validateJobData = (jobData: any) => {
  return jobDataSchema.validate(jobData);
};
