import { config } from "../../config.js";

const isProduction = process.env.NODE_ENV === "production";

export const setAuthCookies = (res, accessToken, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction ? true : false,
    sameSite: "lax",
    path: "/"
  };

  res.cookie("access_token", accessToken, {
    ...cookieOptions,
    maxAge: config.accessTokenMinutes * 60 * 1000
  });

  res.cookie("refresh_token", refreshToken, {
    ...cookieOptions,
    maxAge: config.refreshTokenDays * 24 * 60 * 60 * 1000
  });
};

export const clearAuthCookies = (res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction ? true : false,
    sameSite: "lax",
    path: "/"
  };

  res.clearCookie("access_token", cookieOptions);
  res.clearCookie("refresh_token", cookieOptions);
};