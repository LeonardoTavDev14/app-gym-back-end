import { Router } from "express";

import { ensureJoiValidator } from "../middlewares/ensureJoiValidator";

import { CreateRequestUserSchema } from "../validators/schemas/user/CreateRequestUserSchema";
import { CreateConfirmUserSchema } from "../validators/schemas/user/CreateConfirmUserSchema";
import { AuthUserSchema } from "../validators/schemas/user/AuthUserSchema";
import { RequestParamsSchema } from "../validators/schemas/RequestParamsSchema";

import { CreateUserRequestController } from "../controllers/user/CreateUserRequestController";
import { CreateUserConfirmController } from "../controllers/user/CreateUserConfirmController";
import { AuthUserController } from "../controllers/user/AuthUserController";

const routes = Router();

const createUserRequestController = new CreateUserRequestController();
const createUserConfirmController = new CreateUserConfirmController();
const authUserController = new AuthUserController();

routes.post(
  "/request",
  ensureJoiValidator(CreateRequestUserSchema, "body"),
  createUserRequestController.handle
);
routes.post(
  "/create/:token",
  ensureJoiValidator(RequestParamsSchema, "params"),
  ensureJoiValidator(CreateConfirmUserSchema, "body"),
  createUserConfirmController.handle
);
routes.post(
  "/login",
  ensureJoiValidator(AuthUserSchema, "body"),
  authUserController.handle
);

export { routes as userRoutes };
