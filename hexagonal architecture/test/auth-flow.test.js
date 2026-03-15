import test from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcrypt";

import { createApp } from "../src/app.js";
import { sha256 } from "../src/domain/security.js";

const createRepos = () => {
  const now = () => Date.now();
  const user = {
    id: "user-1",
    nombre: "Demo User",
    correo: "demo@correo.com",
    contrasena: bcrypt.hashSync("123456", 10)
  };

  const sesiones = [];
  const tokens = [];

  let sesionSeq = 1;
  let tokenSeq = 1;

  return {
    usuariosRepo: {
      async obtenerPorCorreo(correo) {
        return correo.toLowerCase() === user.correo.toLowerCase() ? user : null;
      },
      async obtenerPorId(id) {
        return id === user.id ? user : null;
      }
    },
    sesionesRepo: {
      async crear({ usuarioId, ip, agenteUsuario }) {
        const id = `sesion-${sesionSeq++}`;
        sesiones.push({ id, usuarioId, ip, agenteUsuario, revocadaEn: null });
        return id;
      },
      async revocar(sesionId) {
        const found = sesiones.find((s) => s.id === sesionId);
        if (found) {
          found.revocadaEn = new Date().toISOString();
        }
      }
    },
    tokensRepo: {
      async crear({ sesionId, usuarioId, hashToken, expiraEn }) {
        tokens.push({
          id: tokenSeq++,
          sesion_id: sesionId,
          usuario_id: usuarioId,
          hash_token: hashToken,
          expira_en: expiraEn,
          revocado_en: null
        });
      },
      async obtenerValidoPorHash(hashToken) {
        const token = tokens.find((t) => t.hash_token === hashToken);

        if (!token || token.revocado_en) {
          return null;
        }

        if (new Date(token.expira_en).getTime() <= now()) {
          return null;
        }

        return token;
      },
      async revocarPorId(id) {
        const token = tokens.find((t) => t.id === id);
        if (token) {
          token.revocado_en = new Date().toISOString();
        }
      },
      async marcarRotacion() {
        return undefined;
      }
    },
    oauthRepo: {},
    categoriasRepo: {},
    preguntasRepo: {},
    intentosRepo: {},
    respuestasRepo: {},
    _debug: {
      user,
      tokens
    }
  };
};

const getSetCookie = (response) => {
  if (typeof response.headers.getSetCookie === "function") {
    return response.headers.getSetCookie();
  }

  const single = response.headers.get("set-cookie");
  return single ? [single] : [];
};

const cookiePair = (setCookieLine) => setCookieLine.split(";", 1)[0];

test("GET /api/v1/auth/me sin cookie retorna 401", async () => {
  const repos = createRepos();
  const app = createApp({ repos });
  const server = app.listen(0);

  try {
    const port = server.address().port;
    const response = await fetch(`http://127.0.0.1:${port}/api/v1/auth/me`);

    assert.equal(response.status, 401);

    const json = await response.json();
    assert.equal(json.error, "No autorizado");
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test("flujo auth: login -> me -> refresh -> me", async () => {
  const repos = createRepos();
  const app = createApp({ repos });
  const server = app.listen(0);

  try {
    const port = server.address().port;
    const base = `http://127.0.0.1:${port}`;

    const loginRes = await fetch(`${base}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "node-test"
      },
      body: JSON.stringify({
        correo: repos._debug.user.correo,
        contrasena: "123456"
      })
    });

    assert.equal(loginRes.status, 200);

    const loginCookies = getSetCookie(loginRes);
    const accessLine = loginCookies.find((line) => line.startsWith("access_token="));
    const refreshLine = loginCookies.find((line) => line.startsWith("refresh_token="));

    assert.ok(accessLine, "debe devolver cookie access_token");
    assert.ok(refreshLine, "debe devolver cookie refresh_token");

    const meRes = await fetch(`${base}/api/v1/auth/me`, {
      headers: {
        Cookie: cookiePair(accessLine)
      }
    });

    assert.equal(meRes.status, 200);

    const meJson = await meRes.json();
    assert.equal(meJson.id, repos._debug.user.id);

    const refreshRes = await fetch(`${base}/api/v1/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: cookiePair(refreshLine)
      }
    });

    assert.equal(refreshRes.status, 200);

    const refreshJson = await refreshRes.json();
    assert.equal(refreshJson.ok, true);

    const refreshCookies = getSetCookie(refreshRes);
    const refreshedAccess = refreshCookies.find((line) => line.startsWith("access_token="));
    const refreshedRefresh = refreshCookies.find((line) => line.startsWith("refresh_token="));

    assert.ok(refreshedAccess, "refresh debe devolver un nuevo access_token");
    assert.ok(refreshedRefresh, "refresh debe devolver un nuevo refresh_token");

    const oldRefreshHash = sha256(cookiePair(refreshLine).replace("refresh_token=", ""));
    const oldToken = repos._debug.tokens.find((t) => t.hash_token === oldRefreshHash);

    assert.ok(oldToken?.revocado_en, "el refresh token anterior debe quedar revocado");

    const meAfterRefresh = await fetch(`${base}/api/v1/auth/me`, {
      headers: {
        Cookie: cookiePair(refreshedAccess)
      }
    });

    assert.equal(meAfterRefresh.status, 200);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
