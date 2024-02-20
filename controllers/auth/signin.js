import { User } from "../../models/index.js";
import bcrypt from "bcrypt";
import HttpError from "../../helpers/HttpError.js";
import { ctrlWrapper } from "../../decorators/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const signin = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "Email or password is wrong");
	}

	const passwordCompare = bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		throw HttpError(401, "Email or password is wrong");
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, { token });

	res.json({
		token,
		user: {
			email: user.email,
		},
	});
};

export default ctrlWrapper(signin);
