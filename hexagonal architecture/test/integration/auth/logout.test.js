import request from "supertest";
import { app } from "../../testApp.js";
describe("Logout", () => {

    test("debe cerrar sesión", async () => {

        const login = await request(app)
        .post("/api/v1/auth/login")
        .send({
            correo: "admin4@anime.com",
            contrasena: "Hola1234"
        });

        const cookies = login.headers["set-cookie"];

        const logout = await request(app)
        .post("/api/v1/auth/logout")
        .set("Cookie", cookies);

        expect(logout.statusCode).toBe(200);

    });
});