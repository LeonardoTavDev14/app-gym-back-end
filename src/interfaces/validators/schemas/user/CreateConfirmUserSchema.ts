import Joi from "joi";

export const CreateConfirmUserSchema = Joi.object({
  password: Joi.string().min(7).required(),
  age: Joi.number().min(15).required(),
});
