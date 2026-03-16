import request from "supertest";
import { app } from "../../testApp.js";

describe("Login endpoint", () => {

    test("login correcto", async () => {

        const res = await request(app)
        .post("/api/v1/auth/login")
            .send({
                correo: "admin4@anime.com",
            contrasena: "Hola1234"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("id");
        expect(res.headers["set-cookie"]).toBeDefined();
        const cookies = res.headers["set-cookie"];
        expect(cookies.join(";")).toContain("access_token");
        expect(cookies.join(";")).toContain("refresh_token");
    });
});