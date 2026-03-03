import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "cambia_esto",
  accessTokenMinutes: parseInt(process.env.ACCESS_TOKEN_MINUTES || "15", 10),
  refreshTokenDays: parseInt(process.env.REFRESH_TOKEN_DAYS || "7", 10),
  cookieSecure: (process.env.COOKIE_SECURE || "true").toLowerCase() === "true",
  cookieSameSite: process.env.COOKIE_SAMESITE || "lax",
  cookieDomain: process.env.COOKIE_DOMAIN || "",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  oauthRedirectBase: process.env.OAUTH_REDIRECT_BASE || "http://localhost:4000",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  githubClientId: process.env.GITHUB_CLIENT_ID || "",
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || ""
};
