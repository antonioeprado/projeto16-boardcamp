import { Router } from "express";
import {
	getRentals,
	postRentals,
	finishRentals,
	deleteRentals,
} from "../controllers/rentals.controllers.js";
import {
	findCustomer,
	findGame,
	findRentals,
	isInStock,
	isReturned,
	validatePayload,
} from "../middlewares/rentals.middlewares.js";

const router = Router();

router.get("/rentals", getRentals);
router.post(
	"/rentals",
	validatePayload,
	findCustomer,
	findGame,
	isInStock,
	postRentals
);
router.post("/rentals/:id/return", findRentals, isReturned, finishRentals);
router.delete("/rentals/:id", findRentals, isReturned, deleteRentals);

export default router;
