import bcrypt from "bcrypt";
import { AppError } from "../../domain/errors.js";
import { randomToken, sha256 } from "../../domain/security.js";
import { signAccessToken } from "./tokens.js";
import { config } from "../../config.js";
export const buildAuthUsecases = ({ usuariosRepo, sesionesRepo, tokensRepo }) => {
  const registrar = async ({ nombre, correo, contrasena }) => {
    const existe = await usuariosRepo.obtenerPorCorreo(correo);

    if (existe) {
      throw new AppError("Correo ya existe", 409);
    }

    const hash = await bcrypt.hash(contrasena, 10);

    const creado = await usuariosRepo.crearLocal({
      nombre,
      correo,
      contrasenaHash: hash
    });

    if (!creado) {
      throw new AppError("No se pudo crear usuario", 500);
    }

    return creado;
  };

  const loginLocal = async ({ correo, contrasena, ip, agenteUsuario }) => {
    const user = await usuariosRepo.obtenerPorCorreo(correo);

    const hash =
      user?.contrasena ||
      "$2b$10$CwTycUXWue0Thq9StjUM0uJ8qj1d5k6Z8GDZCBoBPXaG9q4CPGK2u";

    const passwordCorrect = await bcrypt.compare(contrasena, hash);

    if (!user || !passwordCorrect) {
      throw new AppError("Credenciales inválidas", 401);
    }

    const sesionId = await sesionesRepo.crear({
      usuarioId: user.id,
      ip,
      agenteUsuario
    });

    if (!sesionId) {
      throw new AppError("No se pudo crear sesión", 500);
    }

    const refreshPlain = randomToken(64);
    const refreshHash = sha256(refreshPlain);

    const expiraEn = new Date(
      Date.now() + config.refreshTokenDays * 86400000
    ).toISOString();

    await tokensRepo.crear({
      sesionId,
      usuarioId: user.id,
      hashToken: refreshHash,
      expiraEn
    });

    const accessToken = signAccessToken({
      sub: user.id,
      sid: sesionId
    });

    return {
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo
      },
      accessToken,
      refreshToken: refreshPlain
    };
  };

  const refresh = async ({ refreshTokenPlain }) => {
    if (!refreshTokenPlain) {
      throw new AppError("No autorizado", 401);
    }

    const refreshHash = sha256(refreshTokenPlain);
    const tokenRow = await tokensRepo.obtenerValidoPorHash(refreshHash);

    if (!tokenRow) {
      throw new AppError("No autorizado", 401);
    }

    const sesionId = tokenRow.sesion_id;
    const usuarioId = tokenRow.usuario_id;

    await tokensRepo.revocarPorId(tokenRow.id);

    const nuevoPlain = randomToken(64);
    const nuevoHash = sha256(nuevoPlain);

    const expiraEn = new Date(
      Date.now() + config.refreshTokenDays * 86400000
    ).toISOString();

    await tokensRepo.crear({
      sesionId,
      usuarioId,
      hashToken: nuevoHash,
      expiraEn
    });

    const accessToken = signAccessToken({
      sub: usuarioId,
      sid: sesionId
    });
    return {
      accessToken,
      refreshToken: nuevoPlain
    };
  };
  const logout = async ({ refreshTokenPlain }) => {
  if (!refreshTokenPlain) {
    return;
  }
  const refreshHash = sha256(refreshTokenPlain);
  const tokenRow = await tokensRepo.obtenerValidoPorHash(refreshHash);
  if (!tokenRow) {
    return;
  }
  await tokensRepo.revocarPorId(tokenRow.id);
  await sesionesRepo.revocar(tokenRow.sesion_id);
};

  return {
    registrar,
    loginLocal,
    refresh,
    logout
  };
};