import jwt from "jsonwebtoken";
import { config } from "../../../config.js";

export const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const payload = jwt.verify(token, config.jwtSecret);

    req.auth = payload;

    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};