import dayjs from "dayjs";
import { connection } from "../database/database.js";

export const getRentals = async (req, res) => {
	try {
		const { customerId, gameId } = req.query;
		if (customerId) {
			const customerRentals = await connection.query(
				`SELECT * FROM rentals WHERE "customerId"=$1`,
				[customerId]
			);
			return res.status(200).send(customerRentals.rows);
		}
		if (gameId) {
			const gameRentals = await connection.query(
				`SELECT * FROM rentals WHERE "gameId"=$1`,
				[gameId]
			);
			return res.status(200).send(gameRentals.rows);
		}
		const rentals = await connection.query("select * from rentals");
		res.status(200).send(rentals.rows);
	} catch (error) {
		res.sendStatus(500);
	}
};

export const postRentals = async (req, res) => {
	try {
		const { customerId, gameId, daysRented } = req.body;
		await connection.query(
			`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, (SELECT CURRENT_DATE), $3, null, (SELECT "pricePerDay" FROM games where id=$2)*$3, null)`,
			[customerId, gameId, daysRented]
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

export const finishRentals = async (req, res) => {
	try {
		const { id } = req.params;
		await connection.query(
			`UPDATE rentals SET "returnDate"=CURRENT_DATE, "delayFee"=((SELECT "rentDate" - CURRENT_DATE FROM rentals WHERE id=$1)*(SELECT "originalPrice" FROM games WHERE id=(SELECT "gameId" FROM rentals WHERE id=$1))) WHERE id=$1`,
			[id]
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

export const deleteRentals = async (req, res) => {
	try {
		const { id } = req.params;
		await connection.query(`DELETE FROM rentals WHERE id=$1`, [id]);
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
};
