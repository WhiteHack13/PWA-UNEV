import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { config } from "./config.js";
import { AppError } from "./domain/errors.js";

import { usuariosRepo } from "./infrastructure/repositories/usuariosRepo.js";
import { sesionesRepo } from "./infrastructure/repositories/sesionesRepo.js";
import { tokensRepo } from "./infrastructure/repositories/tokensRepo.js";
import { oauthRepo } from "./infrastructure/repositories/oauthRepo.js";
import { categoriasRepo } from "./infrastructure/repositories/categoriasRepo.js";
import { preguntasRepo } from "./infrastructure/repositories/preguntasRepo.js";
import { intentosRepo } from "./infrastructure/repositories/intentosRepo.js";
import { respuestasRepo } from "./infrastructure/repositories/respuestasRepo.js";

import { buildRouter } from "./infrastructure/http/routes/routes.js";

const app = express();

app.use(cors({
  origin: config.frontendUrl,
  credentials: true
}));

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

const repos = {
  config,
  usuariosRepo,
  sesionesRepo,
  tokensRepo,
  oauthRepo,
  categoriasRepo,
  preguntasRepo,
  intentosRepo,
  respuestasRepo
};

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

app.listen(config.port, () => {
  console.log(`API running on port ${config.port}`);
});