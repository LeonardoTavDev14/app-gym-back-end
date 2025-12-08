import Joi from "joi";

export const RequestParamsSchema = Joi.object({
  token: Joi.string().required(),
});
