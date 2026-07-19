import 'dotenv/config';
import express from "express";
import cors from 'cors';
import { PORT } from "./config.js";

import userRoutes from "./routes/user.routes.js";


const app = express();
app.use(cors());
app.use(express.json())
app.use(userRoutes)

app.listen(PORT)
console.log("Server corriendo en el puerto", PORT);

