import 'dotenv/config';
import express from "express";
import cors from 'cors';
import { PORT } from "./config.js";
import authRouter from './routes/auth.routes.js';


const app = express();
app.use(cors());
app.use(express.json())
app.use(authRouter)


app.listen(PORT)
console.log("Server corriendo en el puerto", PORT);

