import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({
  path: path.resolve(__dirname, "../.env")
});

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const frontendProtocol = (() => {
  try {
    return new URL(frontendUrl).protocol;
  } catch {
    return "http:";
  }
})();

const cookieSecureEnv = process.env.COOKIE_SECURE;

const cookieSecure =
  cookieSecureEnv === "true" && frontendProtocol === "https:";

export const config = {

  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  accessTokenMinutes: Number(process.env.ACCESS_TOKEN_MINUTES || 15),
  refreshTokenDays: Number(process.env.REFRESH_TOKEN_DAYS || 7),
  cookieSecure,
  cookieSameSite: process.env.COOKIE_SAMESITE || "lax",
  cookieDomain: process.env.COOKIE_DOMAIN || "",
  frontendUrl,
  oauthRedirectBase: process.env.OAUTH_REDIRECT_BASE,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET

};