// import { pool } from "mssql";
import pool from "../db.js";
import { sql } from "../db.js";


export const getUsers = async (req, resp) => {
    try {
        const result = await pool
            .request()
            .query("SELECT * FROM usuario");

        resp.json(result.recordset)
    } catch (error) {

        resp.status(500).json({
            message: error.message
        })
        // console.log(error);

    }
}

export const getUser = async (req, resp) => {
    try {
        const { id } = req.params; // Obtenemos el id desde la URL (ej: /usuarios/5)

        const result = await pool
            .request()
            .input("id", sql.Int, id) // Pasamos el parámetro de forma segura
            .query("SELECT * FROM usuario WHERE id = @id");

        // Si no encuentra al usuario, respondemos con un 404 (Not Found)
        if (result.recordset.length === 0) {
            return resp.status(404).json({ message: "Usuario no encontrado" });
        }

        resp.json(result.recordset[0]); // Devolvemos solo el objeto del usuario, no todo el array
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
};

export const crearUsuario = async (req, resp) => {
    try {
        const { name, email } = req.body; // Obtenemos los datos desde el cuerpo de la petición (JSON)

        // Validación básica por si se te olvida enviar algún dato
        if (!name || !email) {
            return resp.status(400).json({ message: "Por favor, proporciona name y email" });
        }

        const result = await pool
            .request()
            .input("name", sql.VarChar, name)
            .input("email", sql.VarChar, email)
            // Usamos OUTPUT INSERTED.* para que SQL Server nos devuelva el registro que se acaba de crear con su ID generado
            .query("INSERT INTO usuario (name, email) OUTPUT INSERTED.* VALUES (@name, @email)");

        resp.status(201).json(result.recordset[0]); // 201 significa "Creado con éxito"
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
};

export const actualizarUsuario = async (req, resp) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        if (!name || !email) {
            return resp.status(400).json({ message: "Por favor, proporciona name y email para actualizar" });
        }

        const result = await pool
            .request()
            .input("id", sql.Int, id)
            .input("name", sql.VarChar, name)
            .input("email", sql.VarChar, email)
            .query("UPDATE usuario SET name = @name, email = @email WHERE id = @id");

        // rowsAffected[0] nos dice cuántas filas se modificaron en la base de datos
        if (result.rowsAffected[0] === 0) {
            return resp.status(404).json({ message: "Usuario no encontrado para actualizar" });
        }

        resp.json({ message: "Usuario actualizado con éxito" });
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
};

export const eliminarUsuario = async (req, resp) => {
    try {
        const { id } = req.params;

        const result = await pool
            .request()
            .input("id", sql.Int, id)
            .query("DELETE FROM usuario WHERE id = @id");

        if (result.rowsAffected[0] === 0) {
            return resp.status(404).json({ message: "Usuario no encontrado para eliminar" });
        }

        resp.json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
};