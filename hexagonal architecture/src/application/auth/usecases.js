import bcrypt from "bcrypt";
import { AppError } from "../../domain/errors.js";
import { randomToken, sha256 } from "../../domain/security.js";
import { signAccessToken } from "./tokens.js";
import { config } from "../../config.js";
import { pool } from "../../infrastructure/db/pool.js";

export const buildAuthUsecases = ({ usuariosRepo, sesionesRepo, tokensRepo }) => {
  const registrar = async ({ nombre, correo, contrasena }) => {
    const existe = await usuariosRepo.obtenerPorCorreo(correo);
    if (existe) throw new AppError("Correo ya existe", 409);
    const hash = await bcrypt.hash(contrasena, 10);
    const creado = await usuariosRepo.crearLocal({ nombre, correo, contrasenaHash: hash });
    if (!creado) throw new AppError("No se pudo crear usuario", 500);
    return creado;
  };

  const loginLocal = async ({ correo, contrasena, ip, agenteUsuario }) => {
    const user = await usuariosRepo.obtenerPorCorreo(correo);
    if (!user || !user.contrasena) throw new AppError("Credenciales inválidas", 401);
    const ok = await bcrypt.compare(contrasena, user.contrasena);
    if (!ok) throw new AppError("Credenciales inválidas", 401);
    const sesionId = await sesionesRepo.crear({ usuarioId: user.id, ip, agenteUsuario });
    if (!sesionId) throw new AppError("No se pudo crear sesión", 500);
    const refreshPlain = randomToken(64);
    const refreshHash = sha256(refreshPlain);
    const expiraEn = new Date(Date.now() + config.refreshTokenDays * 86400000).toISOString();
    await tokensRepo.crear({ sesionId, usuarioId: user.id, hashToken: refreshHash, expiraEn });
    const access = signAccessToken({ sub: user.id, sid: sesionId });
    return { user: { id: user.id, nombre: user.nombre, correo: user.correo }, accessToken: access, refreshToken: refreshPlain };
  };

  const refresh = async ({ refreshTokenPlain }) => {
    if (!refreshTokenPlain) throw new AppError("No autorizado", 401);
    const refreshHash = sha256(refreshTokenPlain);
    const tokenRow = await tokensRepo.obtenerValidoPorHash(refreshHash);
    if (!tokenRow) throw new AppError("No autorizado", 401);
    const sesionId = tokenRow.sesion_id;
    const usuarioId = tokenRow.usuario_id;
    const nuevoPlain = randomToken(64);
    const nuevoHash = sha256(nuevoPlain);
    const expiraEn = new Date(Date.now() + config.refreshTokenDays * 86400000).toISOString();
    await pool.query("BEGIN");
    try {
      await tokensRepo.revocarPorId(tokenRow.id);
      const { rows } = await pool.query(
        "INSERT INTO tokens_actualizacion (sesion_id, usuario_id, hash_token, expira_en) VALUES ($1,$2,$3,$4) RETURNING id",
        [sesionId, usuarioId, nuevoHash, expiraEn]
      );
      const nuevoId = rows[0].id;
      await tokensRepo.marcarRotacion({ tokenAnteriorId: tokenRow.id, tokenNuevoId: nuevoId });
      await pool.query("COMMIT");
    } catch (e) {
      await pool.query("ROLLBACK");
      throw e;
    }
    const access = signAccessToken({ sub: usuarioId, sid: sesionId });
    return { accessToken: access, refreshToken: nuevoPlain };
  };

  const logout = async ({ refreshTokenPlain, sesionesRepo }) => {
    if (!refreshTokenPlain) return;
    const refreshHash = sha256(refreshTokenPlain);
    const tokenRow = await tokensRepo.obtenerValidoPorHash(refreshHash);
    if (!tokenRow) return;
    await tokensRepo.revocarPorId(tokenRow.id);
    await sesionesRepo.revocar(tokenRow.sesion_id);
  };

  return { registrar, loginLocal, refresh, logout };
};
