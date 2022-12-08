import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/categories.routes.js";
import customerRoutes from "./routes/customers.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import rentalsRoutes from "./routes/rentals.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(categoryRoutes);
app.use(customerRoutes);
app.use(gamesRoutes);
app.use(rentalsRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("Server running on port: ", PORT));
