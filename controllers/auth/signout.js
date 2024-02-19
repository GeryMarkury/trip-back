import { ctrlWrapper } from "../../decorators/index.js";
import { User } from "../../models/index.js";

const signout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.json({
		message: "Signout success",
	});
};

export default ctrlWrapper(signout);
