import {z} from "zod"

export const Todo = z.object({
  "id": z.number(),
  "title": z.string(),
  "completed": z.boolean()
})

export type Todo = z.infer<typeof Todo>

// export type Todo = {
//   "id": number,
//   "title": string,
//   "completed": boolean
// }