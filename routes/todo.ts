import { Todo } from "../types/Todo";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  getTodoById,
  getTodos,
} from "../db";
import { t, router } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { validTokenAndScopeProcedure } from "../middleware/auth";

const publicProcedure = t.procedure;
const editProcedure = validTokenAndScopeProcedure(["edit:todos"]);
const deleteProcedure = validTokenAndScopeProcedure(["delete:todos"]);

export const todoRouter = router({
  getTodos: publicProcedure
    .meta({ openapi: { method: "GET", path: "/todos" } })
    .input(z.void())
    .output(z.array(Todo))
    .query(() => {
      return getTodos();
    }),

  getTodo: t.procedure
    .meta({ openapi: { method: "GET", path: "/todos/{id}" } })
    .input(z.object({ id: z.number() }))
    .output(Todo)
    .query(req => {
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
    .mutation(req => {
      addTodo(req.input.title);
      return "Todo added";
    }),

  completeTodo: editProcedure
    .meta({ openapi: { method: "PUT", path: "/todos/{id}", protect: true } })
    .input(z.object({ id: z.number() }))
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

  deleteTodo: deleteProcedure
    .meta({ openapi: { method: "DELETE", path: "/todos/{id}", protect: true } })
    .input(z.object({ id: z.number() }))
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
