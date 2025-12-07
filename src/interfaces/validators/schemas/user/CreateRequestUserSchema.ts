import Joi from "joi";

export const CreateRequestUserSchema = Joi.object({
  email: Joi.string().email().required(),
});
