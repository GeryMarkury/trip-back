import { Schema, model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Set password for user"],
			min: 5,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		token: String,
		avatarURL: String,
	},
	{ versionKey: false, timestamps: true },
);

userSchema.pre("findOneAndUpdate", handleUpdateValidate);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
