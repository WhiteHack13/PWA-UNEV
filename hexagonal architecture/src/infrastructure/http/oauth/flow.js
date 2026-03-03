import { AppError } from "../../../domain/errors.js";
import { randomToken } from "../../../domain/security.js";
import { config } from "../../../config.js";
import { providers } from "./providers.js";

const enc = (v) => encodeURIComponent(v);

export const startOAuth = (provider, res) => {
  const p = providers[provider];
  if (!p || !p.clientId) throw new AppError("Proveedor no configurado", 400);
  const state = randomToken(24);
  const redirectUri = `${config.oauthRedirectBase}/api/auth/oauth/${provider}/callback`;
  const base = { httpOnly: true, secure: config.cookieSecure, sameSite: config.cookieSameSite, path: "/" };
  if (config.cookieDomain) base.domain = config.cookieDomain;
  res.cookie("oauth_state", state, { ...base, maxAge: 600000 });
  res.cookie("oauth_provider", provider, { ...base, maxAge: 600000 });
  const url = `${p.authorizeUrl}?client_id=${enc(p.clientId)}&redirect_uri=${enc(redirectUri)}&response_type=code&scope=${enc(p.scope)}&state=${enc(state)}`;
  res.redirect(url);
};

const postForm = async (url, bodyObj, headers = {}) => {
  const body = new URLSearchParams(bodyObj).toString();
  const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", ...headers }, body });
  const ct = r.headers.get("content-type") || "";
  const txt = await r.text();
  if (!r.ok) throw new AppError("OAuth token exchange falló", 401);
  if (ct.includes("application/json")) return JSON.parse(txt);
  const params = new URLSearchParams(txt);
  const out = {};
  for (const [k, v] of params.entries()) out[k] = v;
  return out;
};

const getJson = async (url, headers = {}) => {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new AppError("OAuth userinfo falló", 401);
  return r.json();
};

export const finishOAuth = async ({ provider, code, stateCookie, stateQuery, repos }) => {
  if (!code) throw new AppError("Código faltante", 400);
  if (!stateCookie || !stateQuery || stateCookie !== stateQuery) throw new AppError("Estado inválido", 400);
  const p = providers[provider];
  if (!p || !p.clientId || !p.clientSecret) throw new AppError("Proveedor no configurado", 400);
  const redirectUri = `${config.oauthRedirectBase}/api/auth/oauth/${provider}/callback`;

  if (provider === "google") {
    const token = await postForm(p.tokenUrl, { client_id: p.clientId, client_secret: p.clientSecret, code, grant_type: "authorization_code", redirect_uri: redirectUri });
    const info = await getJson(p.userinfoUrl, { Authorization: `Bearer ${token.access_token}` });
    const providerId = String(info.sub || "");
    const correo = info.email || null;
    const nombre = info.name || correo || "Usuario";
    const avatar = info.picture || null;
    const verificado = info.email_verified ? new Date().toISOString() : null;
    return await upsertOAuthUser({ proveedor: "google", providerId, correo, nombre, avatar, verificado, repos });
  }

  if (provider === "github") {
    const token = await postForm(p.tokenUrl, { client_id: p.clientId, client_secret: p.clientSecret, code, redirect_uri: redirectUri }, { Accept: "application/json" });
    const user = await getJson(p.userUrl, { Authorization: `Bearer ${token.access_token}`, "User-Agent": "anime-quiz-backend" });
    let correo = user.email || null;
    if (!correo) {
      const emails = await getJson(p.emailsUrl, { Authorization: `Bearer ${token.access_token}`, "User-Agent": "anime-quiz-backend" });
      const primary = Array.isArray(emails) ? emails.find(e => e.primary) : null;
      correo = primary?.email || (Array.isArray(emails) && emails[0]?.email) || null;
    }
    const providerId = String(user.id || "");
    const nombre = user.name || user.login || correo || "Usuario";
    const avatar = user.avatar_url || null;
    return await upsertOAuthUser({ proveedor: "github", providerId, correo, nombre, avatar, verificado: correo ? new Date().toISOString() : null, repos });
  }

  throw new AppError("Proveedor no soportado", 400);
};

const upsertOAuthUser = async ({ proveedor, providerId, correo, nombre, avatar, verificado, repos }) => {
  const existingOAuth = await repos.oauthRepo.obtenerPorProveedor({ proveedor, cuentaProveedorId: providerId });
  if (existingOAuth) {
    const user = await repos.usuariosRepo.obtenerPorId(existingOAuth.usuario_id);
    if (!user) throw new AppError("Usuario no encontrado", 404);
    return { user };
  }
  let user = null;
  if (correo) {
    const byEmail = await repos.usuariosRepo.obtenerPorCorreo(correo);
    if (byEmail) user = byEmail;
  }
  if (!user) {
    user = await repos.usuariosRepo.crearOAuth({ nombre, correo, correoProveedor: correo, urlAvatar: avatar, correoVerificadoEn: verificado });
    if (!user) throw new AppError("No se pudo crear usuario", 500);
  }
  await repos.oauthRepo.crear({ usuarioId: user.id, proveedor, cuentaProveedorId: providerId });
  return { user };
};
