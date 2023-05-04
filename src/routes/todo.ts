import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Todo } from "../types/Todo";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  getTodoById,
  getTodos,
} from "../db/todo";
import { t, router } from "../trpc";
import { validTokenAndScopeProcedure } from "../middleware/auth";

const publicProcedure = t.procedure;
const protectedProcedure = validTokenAndScopeProcedure([]);
const readProcedure = validTokenAndScopeProcedure(["read:todos"]);
const editProcedure = validTokenAndScopeProcedure(["edit:todos"]);
const editDeleteProcedure = validTokenAndScopeProcedure([
  "edit:todos",
  "delete:todos",
]);

export const todoRouter = router({
  getTodos: publicProcedure
    .meta({ openapi: { method: "GET", path: "/todos" } })
    .input(z.void())
    .output(z.array(Todo))
    .query(() => {
      return getTodos();
    }),

  getTodo: readProcedure
    .meta({ openapi: { method: "GET", path: "/todos/{id}", protect: true } })
    .input(z.object({ id: z.string().uuid() }))
    .output(Todo)
    .query(req => {
      const todo = getTodoById(req.input.id);
      if (!todo) {
        throw new TRPCError({
          message: "Todo not found",
          code: "NOT_FOUND",
        });
      }
      return todo;
    }),

  addTodo: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/todos", protect: true } })
    .input(z.object({ title: z.string() }))
    .output(z.string())
    .mutation(req => {
      addTodo(req.input.title);
      return "Todo added";
    }),

  completeTodo: editProcedure
    .meta({ openapi: { method: "PUT", path: "/todos/{id}", protect: true } })
    .input(z.object({ id: z.string().uuid() }))
    .output(z.object({ message: z.string(), todo: Todo }))
    .mutation(req => {
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

  deleteTodo: editDeleteProcedure
    .meta({ openapi: { method: "DELETE", path: "/todos/{id}", protect: true } })
    .input(z.object({ id: z.string().uuid() }))
    .output(z.object({ message: z.string(), todo: Todo }))
    .mutation(req => {
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
