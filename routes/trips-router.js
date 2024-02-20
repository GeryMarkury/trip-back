import express from "express";
import { getAll, add, getById } from "../controllers/trips/index.js";
import { tripsSchemas } from "../schemas/index.js";
import { isEmptyBody, isValidId, authenticate } from "../middlewars/index.js";
import { validateBody } from "../decorators/index.js";

const tripsRouter = express.Router();

tripsRouter.use(authenticate);

tripsRouter.get("/", getAll);

tripsRouter.get("/:id", isValidId, getById);

tripsRouter.post("/", isEmptyBody, validateBody(tripsSchemas.tripAddSchema), add);

export default tripsRouter;
