import Joi from "joi";

export const categoryValidation = (data: any) => {
  const skillSchema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    __v: Joi.number().optional(),
  });

  const schema = Joi.object({
    category: Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      subcategories: Joi.array().items(Joi.string()).min(1).required(),
      skills: Joi.array().items(Joi.string()).min(1).required(),
      createdAt: Joi.date().optional(),
      updatedAt: Joi.date().optional(),
      __v: Joi.number().optional(),
    }).required(),
    subcategories: Joi.array().items(Joi.string()).min(1).required(),
    skills: Joi.array().items(skillSchema).min(1).required(),
    userId: Joi.required(),
  });

  return schema.validate(data);
};
