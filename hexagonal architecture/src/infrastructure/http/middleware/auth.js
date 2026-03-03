import { AppError } from "../../../domain/errors.js";
import { verifyAccessToken } from "../../../application/auth/tokens.js";

export const requireAuth = (req, _res, next) => {
  const bearer = req.headers.authorization || "";
  const headerToken = bearer.startsWith("Bearer ") ? bearer.slice(7) : "";
  const token = req.cookies?.access_token || headerToken;
  if (!token) return next(new AppError("No autorizado", 401));
  try {
    req.auth = verifyAccessToken(token);
    next();
  } catch {
    next(new AppError("Token inválido", 401));
  }
};
