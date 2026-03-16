import { buildAuthUsecases } from "../../../src/application/auth/usecases.js";
import { jest } from "@jest/globals";
describe("Auth Usecases", () => {

    const usuariosRepo = {
        obtenerPorCorreo: jest.fn()
    };

    const sesionesRepo = {
        crear: jest.fn()
    };

    const tokensRepo = {
        crear: jest.fn()
    };

    const auth = buildAuthUsecases({
        usuariosRepo,
        sesionesRepo,
        tokensRepo
    });

    test("debe fallar si el usuario no existe", async () => {

        usuariosRepo.obtenerPorCorreo.mockResolvedValue(null);

        await expect(
        auth.loginLocal({
            correo: "fake@test.com",
            contrasena: "123456"
        })
        ).rejects.toThrow("Credenciales inválidas");

    });
});