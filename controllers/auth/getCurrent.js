import { ctrlWrapper } from "../../decorators/index.js";

const getCurrent = (req, res) => {
	const { email } = req.user;

	res.json({
		email,
	});
};

export default ctrlWrapper(getCurrent);
