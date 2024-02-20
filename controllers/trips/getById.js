import { Trip } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";

const getById = async (req, res) => {
	const { id } = req.params;
	const result = await Trip.findById(id);
	if (!result) {
		throw HttpError(404, `Trip not found`);
	}
	res.json(result);
};

export default ctrlWrapper(getById);
