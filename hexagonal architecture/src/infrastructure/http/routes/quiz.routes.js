import express from "express";
import { requireAuth } from "../middleware/auth.js";

// import { categoriasController, preguntasController, intentoController, historialController } from "../controllers/quiz.controller.js";

export const quizRoutes = (repos) => {

    const router = express.Router();

    // router.get("/categorias", requireAuth, categoriasController(repos));
    // router.get("/preguntas", preguntasController(repos));
    // router.post("/intentos", requireAuth, intentoController(repos));
    // router.get("/intentos/historial", requireAuth, historialController(repos));

    return router;

};