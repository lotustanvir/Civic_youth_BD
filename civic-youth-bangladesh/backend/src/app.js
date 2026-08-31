import express from "express";
import cors from "cors";
import helmet from "helmet";
import env from "./config/env.js";
import apiRoutes from "./routes/index.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

app.use("/api/v1", apiLimiter);

app.use("/api/v1", apiRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
