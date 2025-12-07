import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

export const ensureJoiValidator = (
  schema: ObjectSchema,
  location: "body" | "params" | "query" = "body"
) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const resultValidate = schema.validate(request[location], {
      abortEarly: false,
    });

    if (resultValidate.error) {
      const firstMessage = resultValidate.error.details[0]?.message;

      return response.status(400).json({
        message: firstMessage || "Erro de validação encontrado!",
        errors: resultValidate.error.details.map((err) => err.message),
      });
    }

    return next();
  };
};
