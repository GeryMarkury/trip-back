import { signup, signin, signout, getCurrent } from "../controllers/auth/index.js";
import express from "express";
import { usersSchemas } from "../schemas/index.js";
import { authenticate } from "../middlewars/index.js";
import { validateBody } from "../decorators/index.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(usersSchemas.userSignupSchema), signup);

authRouter.post("/login", validateBody(usersSchemas.userSigninSchema), signin);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, signout);

export default authRouter;
