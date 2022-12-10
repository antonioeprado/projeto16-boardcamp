import { connection } from "../database/database.js";

export const getGames = async (req, res) => {
	try {
		const { name } = req.query;
		if (name) {
			const games = await connection.query(
				"SELECT * FROM games WHERE LOWER(name) LIKE LOWER($1) || '%'",
				[name]
			);
			return res.status(200).send(games.rows);
		}
		const games = await connection.query("SELECT * FROM games");
		res.status(200).send(games.rows);
	} catch (error) {
		res.sendStatus(500);
	}
};

export const postGames = async (req, res) => {
	try {
		const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
		await connection.query(
			`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,
			[name, image, stockTotal, categoryId, pricePerDay]
		);
		res.sendStatus(201);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};
