import express from "express";
import { registerController, loginController, refreshController, logoutController, meController } from "../controllers/auth.controller.js";

import { requireAuth } from "../middleware/auth.js";

export const authRoutes = (repos) => {

    const router = express.Router();
    router.post("/register", registerController(repos));
    router.post("/login", loginController(repos));
    router.post("/refresh", refreshController(repos));
    router.post("/logout", logoutController(repos));
    router.get("/me", requireAuth, meController(repos));

    return router;

};