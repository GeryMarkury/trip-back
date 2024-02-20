import jwt from "jsonwebtoken";
import { ctrlWrapper } from "../decorators/index.js";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/index.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

export const authenticate = async (req, res, next) => {
	const { authorization = "" } = req.headers;
	const [bearer, token] = authorization.split(" ");
	if (bearer !== "Bearer" && !token) {
		throw HttpError(401);
	}

	try {
		const { id } = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(id);
		if (!user || !user.token) {
			throw HttpError(401);
		}
		req.user = user;
		next();
	} catch {
		throw HttpError(401);
	}
};

export default ctrlWrapper(authenticate);
