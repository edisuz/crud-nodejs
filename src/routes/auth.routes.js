import { Router } from "express";

import { login } from "../controllers/auth.controllers.js";

import logger from "../middlewares/logger.middleware.js";
import validateLogin from "../middlewares/validateLogin.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = Router();

console.log("authRouter cargado");
authRouter.get("/publico", (req, res) => {

    res.send("Endpoint público");

});
authRouter.post(
    "/autenticado",
    logger,
    validateLogin,
    authMiddleware,
    login
);

export default authRouter;


