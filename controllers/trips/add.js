import { Trip } from "../../models/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { cities } from "../../data/index.js";

const add = async (req, res) => {
	const { _id: owner } = req.user;

	const userTrip = cities.find(city => city.city === req.body.city);
	const imageUrl = userTrip.img;

	const result = await Trip.create({ ...req.body, imageUrl, owner });
	res.status(201).json(result);
};

export default ctrlWrapper(add);
