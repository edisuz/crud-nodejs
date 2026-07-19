// import { pool } from "mssql";
import pool from "../db.js";
import { sql } from "../db.js";


export const login = async (req, res) => {
    try {
        console.log(req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                message: "Email y contraseña son obligatorios"
            })
        }

        const result = await pool
            .request()
            .input("email", sql.VarChar, email)
            .query(`
        SELECT *
        FROM Usuarios
        WHERE email = @email`);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "Usuario no encontrado."
            });
        }

        const user = result.recordset[0];

        // Comparar contraseña
        if (user.password !== password) {
            return res.status(401).json({
                ok: false,
                message: "Contraseña incorrecta."
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Inicio de sesión exitoso.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};