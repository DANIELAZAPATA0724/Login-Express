import express from "express";
import { db } from "./database/db.js";
import unifiedRoutes from "./routes/routes.js"; // Importa el nuevo archivo de rutas unificado

const app = express();

app.use(express.json());
app.use("/", unifiedRoutes); // Utiliza las rutas unificadas en lugar de las rutas separadas

db();

app.listen(3000, () => console.log("Se ha conectado")); // Asegúrate de usar una función de callback para el console.log

