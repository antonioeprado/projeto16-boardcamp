import { Router } from "express";
import {
	getCategories,
	postCategories,
} from "../controllers/categories.controllers.js";
import {
	isInDatabase,
	validatePayload,
} from "../middlewares/categories.middlewares.js";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", validatePayload, isInDatabase, postCategories);

export default router;
