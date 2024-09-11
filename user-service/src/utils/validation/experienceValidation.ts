import Joi from "joi";

// Define the Joi schema with custom validation
export const experienceSchema = Joi.object({
  userId: Joi.string().required().messages({
    "any.required": '"User ID" is required',
  }),
  title: Joi.string().min(3).max(100).required().messages({
    "string.base": '"Title" should be a type of text',
    "string.empty": '"Title" cannot be an empty field',
    "string.min": '"Title" should have a minimum length of {#limit}',
    "string.max": '"Title" should have a maximum length of {#limit}',
    "any.required": '"Title" is required',
  }),
  company: Joi.string().min(2).max(100).required().messages({
    "string.base": '"Company" should be a type of text',
    "string.empty": '"Company" cannot be an empty field',
    "string.min": '"Company" should have a minimum length of {#limit}',
    "string.max": '"Company" should have a maximum length of {#limit}',
    "any.required": '"Company" is required',
  }),
  jobLocation: Joi.string().max(100).optional().messages({
    "string.base": '"Job Location" should be a type of text',
    "string.max": '"Job Location" should have a maximum length of {#limit}',
  }),
  country: Joi.string().required().messages({
    "any.required": '"Country" is required',
  }),
  startDate: Joi.string().required().messages({
    "any.required": '"Start Date" is required',
  }),
  endDate: Joi.string().allow("").optional(),
  startMonth: Joi.string().allow("").optional(),
  startYear: Joi.string().allow("").optional(),
  endMonth: Joi.string().allow("").optional(),
  endYear: Joi.string().allow("").optional(),
  description: Joi.string().max(500).optional().messages({
    "string.base": '"Description" should be a type of text',
    "string.max": '"Description" should have a maximum length of {#limit}',
  }),
  isCurrentlyWorking: Joi.boolean().optional(),
})
  .custom((value, helpers) => {
    const { startDate, endDate, isCurrentlyWorking } = value;

    if (isCurrentlyWorking) {
      // If currently working, endDate should not be validated
      return value;
    }

    // Convert date strings to Date objects for comparison
    const start = new Date(`${startDate} 01`);
    const end = endDate ? new Date(`${endDate} 01`) : null;

    if (end && end < start) {
      return helpers.error("dateComparison");
    }
    return value;
  }, "Date Comparison Validation")
  .messages({
    dateComparison: "End date cannot be before start date",
  });
