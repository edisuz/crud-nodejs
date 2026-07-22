import pool from "../db.js";
import { sql } from "../db.js";

const authMiddleware = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const result = await pool
            .request()
            .input("email", sql.VarChar, email)
            .query(`
                SELECT *
                FROM Usuarios
                WHERE email = @email
            `);

        if (result.recordset.length === 0) {

            return res.status(404).json({
                ok: false,
                message: "Usuario no encontrado."
            });

        }

        const user = result.recordset[0];

        if (user.password !== password) {

            return res.status(401).json({
                ok: false,
                message: "Contraseña incorrecta."
            });

        }

        // Compartir el usuario con el controlador
        req.user = user;

        next();

    } catch (error) {

        return res.status(500).json({
            ok: false,
            message: error.message
        });

    }

}

export default authMiddleware;