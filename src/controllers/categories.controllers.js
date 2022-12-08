import { connection } from "../database/database.js";

export const getCategories = async (req, res) => {
	try {
		const categories = await connection.query("SELECT * FROM categories");
		res.status(200).send(categories.rows);
	} catch (error) {
		res.sendStatus(500);
	}
};

export const postCategories = async (req, res) => {
	try {
		const { name } = req.body;
		await connection.query("INSERT INTO categories (name) VALUES ($1)", [name]);
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
};
