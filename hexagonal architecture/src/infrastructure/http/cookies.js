import { config } from "../../config.js";

export const setAuthCookies = (res, accessToken, refreshToken) => {

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: config.cookieSameSite,
    domain: config.cookieDomain || undefined,
    maxAge: config.accessTokenMinutes * 60 * 1000
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: config.cookieSameSite,
    domain: config.cookieDomain || undefined,
    maxAge: config.refreshTokenDays * 86400000
  });

};

export const clearAuthCookies = (res) => {

  res.clearCookie("access_token");

  res.clearCookie("refresh_token");

};