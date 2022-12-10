import { categoryModel } from "./categories.models.js";
import { customerModel } from "./customers.models.js";
import { gameModel } from "./games.models.js";
import { rentalModel } from "./rentals.models.js";

export default class ValidateModel {
	constructor(obj, modelToValidate) {
		this.obj = obj;
		this.modelToValidate = modelToValidate;
		this.models = { categoryModel, customerModel, gameModel, rentalModel };
	}
	get result() {
		return this.setModel();
	}
	setModel() {
		switch (this.modelToValidate) {
			case "customers":
				return this.validateModel(this.models.customerModel, this.obj);
			case "games":
				return this.validateModel(this.models.gameModel, this.obj);
			case "category":
				return this.validateModel(this.models.categoryModel, this.obj);
			case "rental":
				return this.validateModel(this.models.rentalModel, this.obj);
			default:
				return this.validateModel();
		}
	}

	validateModel(model, obj) {
		if (!model) {
			return "No model was provided.";
		}
		const { value, error } = model.validate(obj);
		if (error) {
			const errors = error.details.map((detail) => detail.message);
			console.log(errors);
			return { errors, status: false };
		}
		return { value, status: true };
	}
}
