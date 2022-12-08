import { Router } from "express";
import {
	getCustomers,
	getCustomersById,
	updateCustomers,
} from "../controllers/customers.controllers.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.put("/customers/:id", updateCustomers);

export default router;
