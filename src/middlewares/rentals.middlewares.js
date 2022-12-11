import { connection } from "../database/database.js";
import ValidateModel from "../models/validateModel.js";

export const checkEmptyPayload = (req, res, next) => {
	if (!req.body) {
		return res.sendStatus(400);
	}
	next();
};

export const validatePayload = (req, res, next) => {
	const validation = new ValidateModel(req.body, "rentals");
	const { status, ...rest } = validation.result;
	if (!status) {
		return res.status(400).send(rest);
	}
	next();
};

export const findCustomer = async (req, res, next) => {
	try {
		const customer = await connection.query(
			`SELECT * FROM customers WHERE id=$1`,
			[req.body.customerId]
		);
		if (!customer.rowCount) {
			return res.sendStatus(400);
		}
		next();
	} catch (error) {
		console.log(`Error trying to find customer ${req.body.customerId}`);
	}
};

export const findGame = async (req, res, next) => {
	try {
		const game = await connection.query(`SELECT * FROM games WHERE id=$1`, [
			req.body.gameId,
		]);
		if (!game.rowCount) {
			return res.sendStatus(400);
		}
		res.locals.game = game.rows[0];
		next();
	} catch (error) {
		console.log(`Error trying to find game ${req.body.gameId}`);
	}
};

export const findRentals = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.sendStatus(400);
		}
		const rental = await connection.query(`SELECT * FROM rentals WHERE id=$1`, [
			id,
		]);
		if (!rental.rowCount) {
			return res.sendStatus(404);
		}
		res.locals.rental = rental;
		next();
	} catch (error) {
		console.log(`Error trying to find rental ${id}`);
	}
};
export const isReturned = (req, res, next) => {
	const method = req.method;
	if (method === "DELETE") {
		if (!res.locals.rental.rows[0].returnDate) {
			return res.sendStatus(400);
		}
	} else {
		if (res.locals.rental.rows[0].returnDate) {
			return res.sendStatus(400);
		}
	}
	next();
};
export const isInStock = async (req, res, next) => {
	try {
		const numberOfRentals = await connection.query(
			`SELECT COUNT(*) FROM rentals WHERE "gameId"=$1`,
			[req.params.id]
		);
		if (res.locals.game.stockTotal - numberOfRentals <= 0) {
			return res.sendStatus(400);
		}
		next();
	} catch (error) {
		console.log(`Error ${error}`);
	}
};
