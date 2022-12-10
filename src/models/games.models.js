import Joi from "joi";

export const gameModel = Joi.object({
	name: Joi.string().required(),
	image: Joi.string().uri().required(),
	stockTotal: Joi.number().min(0).required(),
	pricePerDay: Joi.number().min(0).required(),
	categoryId: Joi.number().min(0).required(),
});
