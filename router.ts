import { z } from 'zod';
import { t } from './trpc';
import * as trpcExpress from '@trpc/server/adapters/express';


export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

export const appRouter = t.router({
  getUser: t.procedure.query((req) => {
    // req.input; // string
    return { id: "yoo", name: 'Bilbo' };
  }),
//   createUser: t.procedure
//     .input(z.object({ name: z.string().min(5) }))
//     .mutation(async (req) => {
//       // use your ORM of choice
//       return await UserModel.create({
//         data: req.input,
//       });
//     }),
});
// export type definition of API
export type AppRouter = typeof appRouter;