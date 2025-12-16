import Joi from "joi";

export const AuthUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
