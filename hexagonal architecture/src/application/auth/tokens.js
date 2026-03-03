import jwt from "jsonwebtoken";
import { config } from "../../config.js";

export const signAccessToken = (payload) => jwt.sign(payload, config.jwtSecret, { expiresIn: `${config.accessTokenMinutes}m` });

export const verifyAccessToken = (token) => jwt.verify(token, config.jwtSecret);
