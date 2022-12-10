import { Router } from "express";
import { getGames, postGames } from "../controllers/games.controllers.js";
import {
	isInDatabase,
	validatePayload,
} from "../middlewares/games.middlewares.js";

const router = Router();

router.get("/games", getGames);
router.post("/games/", validatePayload, isInDatabase, postGames);

export default router;
