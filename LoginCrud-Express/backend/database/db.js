import mongoose from 'mongoose';
import { User } from '../models/authModels.js'; // Importa el modelo de usuarios
import { Todo } from '../models/todoModel.js'; // Importa el modelo de tareas

export const db = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/login", {
            // Elimina las opciones obsoletas
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: false, // Si habías agregado esta opción anteriormente

            // Agrega nuevas opciones si es necesario
            // Ejemplo:
            // useFindAndModify: false,
            // autoIndex: false
        });
        console.log("Conectado a la base de datos MongoDB");

        // Define los modelos de usuarios y tareas
        const UserModel = mongoose.model('User', User.schema);
        const TodoModel = mongoose.model('Todo', Todo.schema);

        // Ahora puedes utilizar UserModel y TodoModel en tu aplicación
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};