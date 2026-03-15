import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { config } from "./config.js";
import { AppError } from "./domain/errors.js";
import { buildRouter } from "./infrastructure/http/routes/routes.js";

export const createApp = ({ repos }) => {
  const app = express();

  app.use(
    cors({
      origin: config.frontendUrl,
      credentials: true
    })
  );

  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/v1", buildRouter(repos));

  app.use((err, _req, res, _next) => {
    const status = err instanceof AppError ? err.status : 500;

    res.status(status).json({
      status,
      error: err?.message || "Error interno del servidor"
    });
  });

  return app;
};
