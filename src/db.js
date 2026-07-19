// Para la conexión a la BD


import sql from "mssql";

import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config.js';


// PARA SQL SERVER

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),

    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}
console.log(config);


const pool = await sql.connect(config);
console.log("Conectado correctamente a SQL Server");


export default pool;
export { sql };
