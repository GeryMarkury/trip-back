import { Trip } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";

const getAll = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 4 } = req.query;
	const skip = (page - 1) * limit;
	const trips = await Trip.find({ owner }, "-createdAt -updatedAt", {
		skip,
		limit,
	}).populate("owner", "email");

	res.json(trips);
};

export default ctrlWrapper(getAll);
