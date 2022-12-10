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

router.use(validatePayload);
router.use(isInDatabase);

router.post("/customers", postCustomers);
router.put("/customers/:id", updateCustomers);

export default router;
