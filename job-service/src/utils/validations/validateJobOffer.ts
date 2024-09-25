import Joi from "joi";

const mileStoneSchema = Joi.object({
  description: Joi.string().required().messages({
    "any.required": "Task is required for milestone",
  }),
  dueDate: Joi.date().required().messages({
    "any.required": "Date is required for milestone",
  }),
  amount: Joi.number().positive().required().messages({
    "any.required": "Amount is required for milestone",
    "number.positive": "Amount must be a positive number",
  }),
  isPaid: Joi.boolean(),
});

export const jobOfferValidator = Joi.object({
  clientId: Joi.string().required().messages({
    "any.required": "Client ID is required",
  }),
  freelancerId: Joi.string().required().messages({
    "any.required": "Freelancer ID is required",
  }),
  hiringTeam: Joi.string().required().messages({
    "any.required": "Hiring team is required",
  }),
  relatedJobId: Joi.string().optional().messages({}),
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  paymentType: Joi.string().valid("hourly", "fixed").required().messages({
    "any.required": "Payment type is required",
    "any.only": "Payment type must be either 'hourly' or 'fixed'",
  }),

  paymentOption: Joi.string()
    .valid("oneTime", "mileStone")
    .required()
    .messages({
      "any.required": "Payment option is required",
      "any.only": "Payment option must be either 'oneTime' or 'mileStone'",
    }),

  totalAmount: Joi.number().positive().required().messages({
    "any.required": "Total amount is required",
    "number.positive": "Total amount must be a positive number",
  }),

  hourlyRate: Joi.when("paymentType", {
    is: "hourly",
    then: Joi.number().positive().required().messages({
      "any.required": "Hourly rate is required for hourly payment type",
      "number.positive": "Hourly rate must be a positive number",
    }),
    otherwise: Joi.forbidden(), // Hourly rate should not be provided for fixed payment type
  }),
  dueDate: Joi.when("paymentOption", {
    is: "oneTime",
    then: Joi.date().required().messages({
      "any.required": "Due date is required for one-time payment",
    }),
    otherwise: Joi.forbidden(), // Due date should not be provided for milestone payments
  }),

  numberOfHours: Joi.when("paymentType", {
    is: "hourly",
    then: Joi.number().positive().required().messages({
      "any.required": "Number of hours is required for hourly payment type",
      "number.positive": "Number of hours must be a positive number",
    }),
    otherwise: Joi.forbidden(), // Number of hours should not be provided for fixed payment type
  }),

  mileStone: Joi.when("paymentOption", {
    is: "mileStone",
    then: Joi.array().items(mileStoneSchema).min(1).required().messages({
      "any.required": "Milestone is required when payment option is milestone",
    }),
    otherwise: Joi.forbidden(), // MileStone fields should not be provided for one-time payment
  }),

  description: Joi.string().optional(),

  files: Joi.array().items(Joi.string()),

  isActive: Joi.boolean().optional().default(false),
});
