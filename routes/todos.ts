import express from "express";
import { addTodo, completeTodo, deleteTodo, getTodoById, getTodos } from "../db";
import { withAuthRequired } from "../middleware/auth";

export const todosRouter = express.Router();

// Middleware for all routes in this router
todosRouter.use(withAuthRequired)

// Route handler for GET /todos
todosRouter.get("/", (req, res) => {
  // Logic to retrieve list of todos
  const todos = getTodos()
  res.status(200).json(todos);
});

// Route handler for GET /todos/:id
todosRouter.get("/:id", (req, res) => {
  // Logic to retrieve todo by ID
  const todoId = parseInt(req.params.id);
  const todo = getTodoById(todoId);
  if(!todo) res.status(404).json(`Todo with id: ${todoId} not found`);
  res.status(200).json(todo);
});

// Route handler for POST /todos
todosRouter.post("/", (req, res) => {
  // Logic to create a new todo
  const {title} = req.body
  if(!title) res.status(400).json("Incude title")
  const newTodo = addTodo(title)
  res.status(201).json({ message: `Todo added`, todo: newTodo });
});

// Route handler for PUT /todos/:id
todosRouter.put("/:id", (req, res) => {
  // Logic to update a todo by ID
  const todoId = parseInt(req.params.id);
  const completedTodo = completeTodo(todoId)
  if(!completedTodo) res.status(404).json(`Todo with id: ${todoId} not found`)
  res.status(200).json({ message: `Todo completed`, todo: completedTodo });
});

// Route handler for DELETE /todos/:id
todosRouter.delete("/:id", (req, res) => {
  // Logic to delete a todo by ID
  const todoId = parseInt(req.params.id);
  const deletedTodo = deleteTodo(todoId)
  if(!deletedTodo) res.status(404).json(`Todo with id: ${todoId} not found`)
  res.status(200).json({ message: `Todo deleted`, todo: deletedTodo });
});
