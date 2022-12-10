import Joi from "joi";

export const categoryModel = Joi.object({
	name: Joi.string().required(),
});
