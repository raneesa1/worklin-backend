import Joi from "joi";
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signupValidation = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  accountType: Joi.string().required().messages({
    "string.empty": "Account Type is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  country: Joi.string().required().messages({
    "string.empty": "Country is required",
  }),
  password: Joi.string().pattern(passwordPattern).required().messages({
    "string.empty": "Password is required",
    "string.pattern.base": `Password is not strong!`,
  }),
  
});