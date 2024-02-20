import { Schema, model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";
import { minDate, maxDate } from "../helpers/date.js";
import { citiesImgs, citiesNames } from "../data/index.js";

const tripSchema = new Schema({
	city: {
		type: String,
		required: [true, "Set a city of your destination"],
		enum: citiesNames,
	},
	imageUrl: {
		type: String,
		enum: citiesImgs,
	},
	timeStart: {
		type: Date,
		required: [true, "Set a start date of your trip"],
		min: minDate,
		max: maxDate,
	},
	timeEnd: {
		type: Date,
		required: [true, "Set an end date of your trip"],
		min: minDate,
		max: maxDate,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
});

tripSchema.pre("findOneAndUpdate", handleUpdateValidate);

tripSchema.post("save", handleSaveError);

tripSchema.post("findOneAndUpdate", handleSaveError);

const Trip = model("trip", tripSchema);

export default Trip;
