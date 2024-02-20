import Joi from "joi";

const userSignupSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

const userSigninSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export default {
	userSignupSchema,
	userSigninSchema,
};
