import { config } from "../../config.js";

export const setAuthCookies = (res, accessToken, refreshToken) => {
  const base = { httpOnly: true, secure: config.cookieSecure, sameSite: config.cookieSameSite, path: "/" };
  if (config.cookieDomain) base.domain = config.cookieDomain;
  res.cookie("access_token", accessToken, { ...base, maxAge: config.accessTokenMinutes * 60 * 1000 });
  res.cookie("refresh_token", refreshToken, { ...base, maxAge: config.refreshTokenDays * 24 * 60 * 60 * 1000 });
};

export const clearAuthCookies = (res) => {
  const base = { httpOnly: true, secure: config.cookieSecure, sameSite: config.cookieSameSite, path: "/" };
  if (config.cookieDomain) base.domain = config.cookieDomain;
  res.clearCookie("access_token", base);
  res.clearCookie("refresh_token", base);
  res.clearCookie("oauth_state", base);
  res.clearCookie("oauth_provider", base);
};
