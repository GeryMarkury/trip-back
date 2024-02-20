import Joi from "joi";

const tripAddSchema = Joi.object({
	city: Joi.string().required().messages({
		"any.required": `missing required "city" field`,
	}),
	timeStart: Joi.date().required(),
	timeEnd: Joi.date().required(),
});

export default {
	tripAddSchema,
};
