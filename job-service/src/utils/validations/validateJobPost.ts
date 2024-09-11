import Joi from "joi";
import { JobPost } from "../../domain/interface/IJobPost";

// Validation schema for JobPost
export const jobPostValidation = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title should be at least 3 characters long",
    "string.max": "Title should not exceed 100 characters",
  }),
  skills: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().required().messages({
          "string.empty": "Skill ID is required",
        }),
        name: Joi.string().required().messages({
          "string.empty": "Skill name is required",
        }),
        description: Joi.string().required().messages({
          "string.empty": "Skill description is required",
        }),
        __v: Joi.number().optional(), // Allowing __v key
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one skill is required",
      "any.required": "Skills are required",
    }),
  rate: Joi.string().valid("hourly", "fixed").required().messages({
    "any.only": "Rate should be either 'hourly' or 'fixed'",
    "any.required": "Rate is required",
  }),
  priceTo: Joi.number().greater(Joi.ref("priceFrom")).required().messages({
    "number.greater": "Price To must be greater than Price From",
    "any.required": "Price To is required",
  }),
  priceFrom: Joi.number().required().messages({
    "any.required": "Price From is required",
  }),
  createdAt: Joi.optional(),
  isActive: Joi.optional(),
  hires: Joi.optional(),
  acceptedApplication: Joi.optional(),
  applications: Joi.optional(),
  experience: Joi.string()
    .valid("Entry", "Intermediate", "Expert")
    .required()
    .messages({
      "any.only": "Experience should be 'Entry', 'Intermediate', or 'Expert'",
      "any.required": "Experience is required",
    }),
  duration: Joi.string().required().messages({
    "string.empty": "Duration is required",
  }),
  description: Joi.string().min(10).max(50000).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description should be at least 10 characters long",
    "string.max": "Description should not exceed 50000 characters",
  }),
  clientId: Joi.string().required().messages({
    "string.empty": "Client ID is required",
  }),
  isCompleted: Joi.boolean().optional(),
  _id: Joi.string().optional(), // Allowing _id key
  __v: Joi.number().optional(), // Allowing __v key
});

// Function to validate the job post input
export const validateJobPostInput = (jobPost: JobPost) => {
  const { error, value } = jobPostValidation.validate(jobPost, {
    abortEarly: false,
    allowUnknown: true, // Allowing unknown fields
  });

  // Return the error and value
  return { error, value };
};
