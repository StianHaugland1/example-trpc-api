import { z } from "zod";

export const Todo = z.object({
  // id: z.number(),
  id: z.string().uuid(),
  title: z.string(),
  completed: z.boolean(),
});

export type Todo = z.infer<typeof Todo>;
