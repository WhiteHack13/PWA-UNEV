import express from "express";
import { AppError } from "../../domain/errors.js";
import { requireAuth } from "./middleware/auth.js";
import { setAuthCookies, clearAuthCookies } from "./cookies.js";
import { startOAuth, finishOAuth } from "./oauth/flow.js";
import { buildAuthUsecases } from "../../application/auth/usecases.js";
import { buildQuizUsecases } from "../../application/quiz/usecases.js";
import { randomToken, sha256 } from "../../domain/security.js";
import { signAccessToken } from "../../application/auth/tokens.js";
import { config } from "../../config.js";

export const buildRouter = (repos) => {
  const router = express.Router();

  const authUC = buildAuthUsecases({
    usuariosRepo: repos.usuariosRepo,
    sesionesRepo: repos.sesionesRepo,
    tokensRepo: repos.tokensRepo
  });

  const quizUC = buildQuizUsecases({
    categoriasRepo: repos.categoriasRepo,
    preguntasRepo: repos.preguntasRepo,
    intentosRepo: repos.intentosRepo,
    respuestasRepo: repos.respuestasRepo
  });

  router.post("/auth/register", async (req, res, next) => {
    try {
      const { nombre, correo, contrasena } = req.body || {};
      if (!correo || !contrasena) throw new AppError("Datos incompletos", 400);
      const user = await authUC.registrar({ nombre: nombre || "Usuario", correo, contrasena });
      res.json({ id: user.id, nombre: user.nombre, correo: user.correo });
    } catch (e) { next(e); }
  });

  router.post("/auth/login", async (req, res, next) => {
    try {
      const { correo, contrasena } = req.body || {};
      if (!correo || !contrasena) throw new AppError("Datos incompletos", 400);
      const ip = req.ip;
      const agenteUsuario = req.headers["user-agent"] || "";
      const out = await authUC.loginLocal({ correo, contrasena, ip, agenteUsuario });
      setAuthCookies(res, out.accessToken, out.refreshToken);
      res.json(out.user);
    } catch (e) { next(e); }
  });

  router.post("/auth/refresh", async (req, res, next) => {
    try {
      const refreshTokenPlain = req.cookies?.refresh_token || "";
      const out = await authUC.refresh({ refreshTokenPlain });
      setAuthCookies(res, out.accessToken, out.refreshToken);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });

  router.post("/auth/logout", async (req, res, next) => {
    try {
      const refreshTokenPlain = req.cookies?.refresh_token || "";
      await authUC.logout({ refreshTokenPlain, sesionesRepo: repos.sesionesRepo });
      clearAuthCookies(res);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });

  router.get("/me", requireAuth, async (req, res, next) => {
    try {
      const userId = req.auth?.sub;
      const user = await repos.usuariosRepo.obtenerPorId(userId);
      if (!user) throw new AppError("No encontrado", 404);
      res.json({ id: user.id, nombre: user.nombre, correo: user.correo });
    } catch (e) { next(e); }
  });

  router.get("/auth/oauth/:provider/start", async (req, res, next) => {
    try { startOAuth(req.params.provider, res); } catch (e) { next(e); }
  });

  router.get("/auth/oauth/:provider/callback", async (req, res, next) => {
    try {
      const provider = req.params.provider;
      const code = req.query.code;
      const stateQuery = req.query.state;
      const stateCookie = req.cookies?.oauth_state || "";
      const { user } = await finishOAuth({ provider, code, stateCookie, stateQuery, repos });

      const ip = req.ip;
      const agenteUsuario = req.headers["user-agent"] || "";
      const sesionId = await repos.sesionesRepo.crear({ usuarioId: user.id, ip, agenteUsuario });

      const refreshPlain = randomToken(64);
      const refreshHash = sha256(refreshPlain);
      const expiraEn = new Date(Date.now() + config.refreshTokenDays * 86400000).toISOString();
      await repos.tokensRepo.crear({ sesionId, usuarioId: user.id, hashToken: refreshHash, expiraEn });

      const access = signAccessToken({ sub: user.id, sid: sesionId });

      setAuthCookies(res, access, refreshPlain);
      clearAuthCookies(res);
      res.redirect(config.frontendUrl);
    } catch (e) { next(e); }
  });

  router.get("/categorias", requireAuth, async (_req, res, next) => {
    try { res.json(await quizUC.listarCategorias()); } catch (e) { next(e); }
  });

  router.get("/preguntas", requireAuth, async (req, res, next) => {
    try {
      const { slug, limite } = req.query;
      res.json(await quizUC.obtenerPreguntas({ slug, limite }));
    } catch (e) { next(e); }
  });

  router.post("/intentos", requireAuth, async (req, res, next) => {
    try {
      const usuarioId = req.auth?.sub;
      const { categoria_slug, respuestas } = req.body || {};
      res.json(await quizUC.registrarIntento({ usuarioId, categoriaSlug: categoria_slug, respuestas }));
    } catch (e) { next(e); }
  });

  router.get("/intentos/historial", requireAuth, async (req, res, next) => {
    try {
      const usuarioId = req.auth?.sub;
      res.json(await quizUC.historial({ usuarioId }));
    } catch (e) { next(e); }
  });

  return router;
};
