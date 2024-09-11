// locationValidation.ts
import Joi from "joi";

export const locationValidation = Joi.object({
  country: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().optional(),
  phone: Joi.string().required(),
  zip: Joi.string().optional(),
  apt: Joi.string().allow("").optional(),
  dob: Joi.date().required(),
  imageUrl: Joi.string().uri(),
});
