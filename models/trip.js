import { Schema, model } from "mongoose";

import { handleSaveError, handleUpdateValidate } from "./hooks.js";

const tripSchema = new Schema({
	city: {
		type: String,
		required: [true, "Set a city of your destination"],
	},
	imageUrl: {
		type: String,
	},
	timeStart: {
		type: Date,
		required: [true, "Set a start date of your trip"],
	},
	timeEnd: {
		type: Date,
		required: [true, "Set an end date of your trip"],
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
