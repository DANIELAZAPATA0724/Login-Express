import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    task: { type: String, required: true },
    type: { type: String, enum:["work", "school", "free"], required: true },
}, { timestamps: true });


export const Todo = mongoose.model("task", todoSchema);
//definimos variable Todo para que busque información del Esquema en la tabla task