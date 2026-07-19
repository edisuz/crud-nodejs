import { Router } from "express";
import {
    login

} from "../controllers/auth.controllers.js";

const authRouter = Router();

// Endpoint público (No autenticado y no autorizado)

authRouter.get('/publico', (req, res) =>
    res.send('Endpoint público'))

//Endpoint autenticado

authRouter.post('/autenticado', login)

//Endpoint autorizado



export default authRouter


