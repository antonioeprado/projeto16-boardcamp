import Joi from "joi";

export const rentalModel = Joi.object({
	customerId: Joi.number().min(1).required(),
	gameId: Joi.number().min(1).required(),
	daysRented: Joi.number().min(1).required(),
});
