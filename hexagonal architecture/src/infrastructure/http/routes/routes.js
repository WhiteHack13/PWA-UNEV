import express from "express";

import { authRoutes } from "./auth.routes.js";
import { quizRoutes } from "./quiz.routes.js";

export const buildRouter = (repos) => {

    const router = express.Router();
    router.use("/auth", authRoutes(repos));
    router.use("/quiz", quizRoutes(repos));

    return router;
};