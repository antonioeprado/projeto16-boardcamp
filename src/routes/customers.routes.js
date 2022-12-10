import { Router } from "express";
import {
	getCustomers,
	getCustomersById,
	postCustomers,
	updateCustomers,
} from "../controllers/customers.controllers.js";
import {
	isInDatabase,
	validatePayload,
} from "../middlewares/customers.middlewares.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post("/customers", validatePayload, isInDatabase, postCustomers);
router.put("/customers/:id", validatePayload, isInDatabase, updateCustomers);

export default router;
