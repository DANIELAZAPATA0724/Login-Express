import express from "express";
import { Login, Register } from "../controllers/authController.js";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getATodo,
} from "../controllers/todo.controller.js";

const authRouter = express.Router();
authRouter.post("/register", Register);
authRouter.post("/login", Login);

const todoRouter = express.Router();
todoRouter.get("/", getTodos);
todoRouter.post("/", createTodo);
todoRouter.put("/update/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);
todoRouter.get("/:id", getATodo);

const unifiedRouter = express.Router();
unifiedRouter.use("/auth", authRouter);
unifiedRouter.use("/todos", todoRouter);

export default unifiedRouter;
