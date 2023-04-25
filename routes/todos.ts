import { Todo } from "./../types/Todo";
import express from "express";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  getTodoById,
  getTodos,
} from "../db";
// import { withAuthRequired } from "../middleware/auth";
import { t, router } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { procedureWithValidTokenAndScopes } from "../middleware/auth";
// import { protectedProcedure } from "../middleware/auth";

export const todosRouter = express.Router();
////OLD
// // Middleware for all routes in this router
// todosRouter.use(withAuthRequired);

// // Route handler for GET /todos
// todosRouter.get("/", (req, res) => {
//   // Logic to retrieve list of todos
//   const todos = getTodos();
//   res.status(200).json(todos);
// });

// // Route handler for GET /todos/:id
// todosRouter.get("/:id", (req, res) => {
//   // Logic to retrieve todo by ID
//   const todoId = parseInt(req.params.id);
//   const todo = getTodoById(todoId);
//   if (!todo) res.status(404).json(`Todo with id: ${todoId} not found`);
//   res.status(200).json(todo);
// });

// // Route handler for POST /todos
// todosRouter.post("/", (req, res) => {
//   // Logic to create a new todo
//   const { title } = req.body;
//   if (!title) res.status(400).json("Incude title");
//   const newTodo = addTodo(title);
//   res.status(201).json({ message: `Todo added`, todo: newTodo });
// });

// // Route handler for PUT /todos/:id
// todosRouter.put("/:id", (req, res) => {
//   // Logic to update a todo by ID
//   const todoId = parseInt(req.params.id);
//   const completedTodo = completeTodo(todoId);
//   if (!completedTodo) res.status(404).json(`Todo with id: ${todoId} not found`);
//   res.status(200).json({ message: `Todo completed`, todo: completedTodo });
// });

// // Route handler for DELETE /todos/:id
// todosRouter.delete("/:id", (req, res) => {
//   // Logic to delete a todo by ID
//   const todoId = parseInt(req.params.id);
//   const deletedTodo = deleteTodo(todoId);
//   if (!deletedTodo) res.status(404).json(`Todo with id: ${todoId} not found`);
//   res.status(200).json({ message: `Todo deleted`, todo: deletedTodo });
// });

/// newRouter
const protectedProcedureWithReadScope = procedureWithValidTokenAndScopes(["read:todos"])

export const todoRouter = router({
  // getTodos: t.procedure
  getTodos: protectedProcedureWithReadScope
    .meta({ openapi: { method: "GET", path: "/todos", protect: true } })
    .input(z.void())
    .output(z.array(Todo))
    .query((req) => {
      return getTodos();
    }),

  getTodo: t.procedure
    .meta({ openapi: { method: "GET", path: "/todos/{id}" } })
    .input(z.object({ id: z.number() }))
    .output(Todo)
    .query((req) => {
      // const todoId = parseInt(req.input.id);
      const todo = getTodoById(req.input.id);
      if (!todo) {
        throw new TRPCError({
          message: "Todo not found",
          code: "NOT_FOUND",
        });
      }
      return todo;
    }),

  addTodo: t.procedure
    .meta({ openapi: { method: "POST", path: "/todos" } })
    .input(z.object({ title: z.string() }))
    .output(z.string())
    .mutation((req) => {
      addTodo(req.input.title);
      return "Todo added";
    }),

  completeTodo: t.procedure
    .meta({ openapi: { method: "PUT", path: "/todos/{id}" } })
    .input(z.object({ id: z.number() }))
    .output(z.object({ message: z.string(), todo: Todo }))
    .mutation((req) => {
      const completedTodo = completeTodo(req.input.id);
      if (!completedTodo)
        throw new TRPCError({
          message: "Todo not found",
          code: "NOT_FOUND",
        });
      return {
        message: "Todo completed",
        todo: completedTodo,
      };
    }),


  deleteTodo: t.procedure
  .meta({ openapi: { method: "DELETE", path: "/todos/{id}" } })
  .input(z.object({ id: z.number() }))
  .output(z.object({ message: z.string(), todo: Todo }))
  .mutation((req) => {
    const deletedTodo = deleteTodo(req.input.id);
    if (!deletedTodo)
      throw new TRPCError({
        message: "Todo not found",
        code: "NOT_FOUND",
      });
    return {
      message: "Todo deleted",
      todo: deletedTodo,
    };
  }),
});
