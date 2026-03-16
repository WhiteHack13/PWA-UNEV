
import request from "supertest";
import { app } from "../../testApp.js";
describe("Refresh token", () => {

    test("debe renovar token", async () => {

    const login = await request(app)
    .post("/api/v1/auth/login")
    .send({
        correo: "admin4@anime.com",
        contrasena: "Hola1234"
    });

    const cookies = login.headers["set-cookie"];

    const refresh = await request(app)
    .post("/api/v1/auth/refresh")
    .set("Cookie", cookies);

    expect(refresh.statusCode).toBe(200);

    expect(refresh.body).toHaveProperty("ok", true);

    expect(refresh.headers["set-cookie"]).toBeDefined();

    });
});