import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./routes/auth/auth.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

/* body parser */
app.use(express.json());

/* health check */
app.get("/health", (req, res) => {
  res.send("Health is ok!");
});

/* auth routes */
app.use("/api/auth", authRoutes);

/* global error handler */
app.use(errorHandler);

export default app;
