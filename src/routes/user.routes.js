import { Router } from "express";
import {
    actualizarUsuario,
    crearUsuario,
    eliminarUsuario,
    getUser,
    getUsers

} from "../controllers/user.controllers.js";

const router = Router();

// Para listar usuarios
router.get('/users', getUsers)

// Para obtener un usuario por id
router.get('/users/:id', getUser)

// Para crear usuario
router.post('/users', crearUsuario)

// Para eliminar usuario
router.delete('/users/:id', eliminarUsuario)

// Para actualizar un usuario por id
router.put('/users/:id', actualizarUsuario)

export default router


