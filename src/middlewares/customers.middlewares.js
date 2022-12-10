import { connection } from "../database/database.js";
import ValidateModel from "../models/validateModel.js";

export const validatePayload = (req, res, next) => {
	const validation = new ValidateModel(req.body, "customers");
	const { status, ...rest } = validation.result;
	if (!status) {
		return res.status(400).send(rest);
	}
	next();
};

export const isInDatabase = async (req, res, next) => {
	const query = await connection.query(`SELECT * FROM customers WHERE cpf=$1`, [
		req.body.cpf,
	]);
	if (query.rowCount) {
		return res.sendStatus(409);
	}
	next();
};
