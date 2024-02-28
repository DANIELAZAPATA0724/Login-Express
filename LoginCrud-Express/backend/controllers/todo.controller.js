import { Todo } from '../models/todoModel.js';

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "No muestra datos del servidor", error});
    }
};
//controlador metodo get un id
export const getATodo = async (req, res) => {
    const id = req.params.id
    try {
        const todos = await Todo.findById({_id:id});
        res.status(200).json(todos);
        console.log(todos)
    } catch (error) {
        res.status(500).json({ message: "No muestra datos del servidor", error });
    }
};

export const createTodo = async (req, res) => {
    const { title, task, type } = req.body;
    try {
        const todo = new Todo({
            title: title,
            task: task,
            type: type
        });
        console.log(todo);

        await todo.save();
        res.status(200).json({ message: "Todo ok", todo });
    } catch (error) {
        res.status(500).json({ message: "No muestra datos del servidor", error });
    }
};

export const updateTodo = async (req, res) => {
    const id = req.params.id
    console.log(id);
   try {
    await Todo.updateOne({_id:id}, req.body);
    res.status(200).json({message: "Todo ok", id});
   } catch (error) {
    res.status(500).json({ message: "No muestra datos del servidor", error});
   }
}

//Delete

export const deleteTodo = async (req, res) => {
    const id = req.params.id
    console.log(id);
   try {
    await Todo.deleteOne({_id:id}, req.body);
    res.status(200).json({message: "Todo ok", id});
   } catch (error) {
    res.status(500).json({ message: "No muestra datos del servidor", error});
   }
}