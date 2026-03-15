import jwt from "jsonwebtoken";
import { config } from "../../../config.js";

export const requireAuth = (req, res, next) => {
  try {

    const cookieToken = req.cookies?.access_token;

    const authHeader = req.headers.authorization || "";
    const bearerToken = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    const token = cookieToken || bearerToken;

    if (!token) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const payload = jwt.verify(token, config.jwtSecret);

    req.auth = payload;

    next();

  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};