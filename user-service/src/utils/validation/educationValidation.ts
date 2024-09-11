import Joi from "joi";

// Define the Joi schema with custom validation
export const educationValidation = Joi.object({
  userId: Joi.string().required().messages({
    "any.required": "User ID is required",
  }),
  school: Joi.string().min(2).max(100).required().messages({
    "string.base": "School should be a type of text",
    "string.empty": "School cannot be an empty field",
    "string.min": "School should have a minimum length of {#limit}",
    "string.max": "School should have a maximum length of {#limit}",
    "any.required": "School is required",
  }),
  degree: Joi.string().min(2).max(100).required().messages({
    "string.base": "Degree should be a type of text",
    "string.empty": "Degree cannot be an empty field",
    "string.min": "Degree should have a minimum length of {#limit}",
    "string.max": "Degree should have a maximum length of {#limit}",
    "any.required": "Degree is required",
  }),
  fieldOfStudy: Joi.string().min(2).max(100).required().messages({
    "string.base": "Field of Study should be a type of text",
    "string.empty": "Field of Study cannot be an empty field",
    "string.min": "Field of Study should have a minimum length of {#limit}",
    "string.max": "Field of Study should have a maximum length of {#limit}",
    "any.required": "Field of Study is required",
  }),
  fromMonth: Joi.string().required().messages({
    "any.required": "From Month is required",
  }),
  fromYear: Joi.string().required().messages({
    "any.required": "From Year is required",
  }),
  toMonth: Joi.string().allow("").required().messages({
    "any.required": '"From Year" is required',
  }),
  toYear: Joi.string().allow("").required().messages({
    "any.required": "From Year is required",
  }),
  description: Joi.string().max(500).optional().messages({
    "string.base": "Description should be a type of text",
    "string.max": "Description should have a maximum length of {#limit}",
  }),
})
  .custom((value, helpers) => {
    const { fromMonth, fromYear, toMonth, toYear } = value;

    if (toMonth && toYear) {
      // Convert date strings to Date objects for comparison
      const start = new Date(`${fromMonth} ${fromYear}`);
      const end = new Date(`${toMonth} ${toYear}`);

      if (end < start) {
        return helpers.error("dateComparison");
      }
    }

    return value;
  }, "Date Comparison Validation")
  .messages({
    dateComparison: "End date cannot be before start date",
  });
