import { Router } from "express";

import { ensureJoiValidator } from "../middlewares/ensureJoiValidator";

import { CreateUserRequestController } from "../controllers/user/CreateUserRequestController";

import { CreateRequestUserSchema } from "../validators/schemas/user/CreateRequestUserSchema";

const routes = Router();

const createUserRequestController = new CreateUserRequestController();

routes.post(
  "/request",
  ensureJoiValidator(CreateRequestUserSchema, "body"),
  createUserRequestController.handle
);

export { routes as userRoutes };
