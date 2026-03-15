import { AppError } from "../../../domain/errors.js";
import { setAuthCookies, clearAuthCookies } from "../cookies.js";
import { buildAuthUsecases } from "../../../application/auth/usecases.js";

const buildUC = (repos) =>
buildAuthUsecases({
    usuariosRepo: repos.usuariosRepo,
    sesionesRepo: repos.sesionesRepo,
    tokensRepo: repos.tokensRepo
});

export const registerController = (repos) => {
const authUC = buildUC(repos);

return async (req, res, next) => {
    try {
    const { nombre, correo, contrasena } = req.body || {};

    if (!correo || !contrasena) {
        throw new AppError("Datos incompletos", 400);
    }

    const user = await authUC.registrar({
        nombre: nombre || "Usuario",
        correo,
        contrasena
    });

    return res.status(201).json({
        id: user.id,
        nombre: user.nombre,
        correo: user.correo
    });
    } catch (error) {
    next(error);
    }
};
};

export const loginController = (repos) => {
const authUC = buildUC(repos);

return async (req, res, next) => {
    try {
    const { correo, contrasena } = req.body || {};

    if (!correo || !contrasena) {
        throw new AppError("Datos incompletos", 400);
    }

    const ip = req.ip;
    const agenteUsuario = req.headers["user-agent"] || "";

    const result = await authUC.loginLocal({
        correo,
        contrasena,
        ip,
        agenteUsuario
    });

    setAuthCookies(res, result.accessToken, result.refreshToken);

    return res.status(200).json({
        id: result.user.id,
        nombre: result.user.nombre,
        correo: result.user.correo
    });
    } catch (error) {
    next(error);
    }
};
};

export const refreshController = (repos) => {
    const authUC = buildUC(repos);
    return async (req, res, next) => {
        try {
        const refreshTokenPlain = req.cookies?.refresh_token;
        if (!refreshTokenPlain) {
            throw new AppError("Refresh token no enviado", 401);
        }
        const result = await authUC.refresh({
            refreshTokenPlain
        });
        setAuthCookies(res, result.accessToken, result.refreshToken);
        res.json({
            ok: true
        });
        } catch (error) {
        next(error);
        }
    };
};

export const logoutController = (repos) => {
const authUC = buildUC(repos);

return async (req, res, next) => {
    try {
    const refreshTokenPlain = req.cookies?.refresh_token;

    await authUC.logout({
        refreshTokenPlain
    });

    clearAuthCookies(res);

    return res.status(200).json({ ok: true });
    } catch (error) {
    next(error);
    }
};
};

export const meController = (repos) => {
return async (req, res, next) => {
    try {
    const userId = req.auth?.sub;

    if (!userId) {
        throw new AppError("No autorizado", 401);
    }

    const user = await repos.usuariosRepo.obtenerPorId(userId);

    if (!user) {
        throw new AppError("Usuario no encontrado", 404);
    }

    return res.status(200).json({
        id: user.id,
        nombre: user.nombre,
        correo: user.correo
    });
    } catch (error) {
    next(error);
    }
};
};