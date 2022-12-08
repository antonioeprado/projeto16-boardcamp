import { connection } from "../database/database.js";

export const getCustomers = async (req, res) => {
	try {
		const cpf = req.query.cpf;
		if (cpf) {
			const customers = await connection.query(
				`SELECT * FROM customers WHERE cpf LIKE $1 || '%'`,
				[cpf]
			);
			return res.status(200).send(customers.rows);
		}
		const customers = await connection.query("SELECT * FROM customers");
		res.status(200).send(customers.rows);
	} catch (error) {
		res.sendStatus(404);
	}
};

export const getCustomersById = async (req, res) => {
	try {
		const { id } = req.params;
		const customer = await connection.query(
			`SELECT * FROM customers WHERE id=$1`,
			[id]
		);
		res.status(200).send(customer.rows);
	} catch (error) {
		res.sendStatus(500);
	}
};

export const postCustomers = async (req, res) => {
	try {
		const { name, phone, cpf, birthday } = req.body;
		await connection.query(
			"INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
			[name, phone, cpf, birthday]
		);
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
};

export const updateCustomers = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, phone, cpf, birthday } = req.body;

		await connection.query(
			"UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5",
			[name, phone, cpf, birthday, id]
		);
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
};
