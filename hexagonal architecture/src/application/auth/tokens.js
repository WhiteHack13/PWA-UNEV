import jwt from "jsonwebtoken";
import { config } from "../../config.js";

export const signAccessToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: `${config.accessTokenMinutes}m`
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};