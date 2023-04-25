import { router } from '../trpc';
import * as trpcExpress from '@trpc/server/adapters/express';
import { todoRouter } from './todos';
import { inferAsyncReturnType } from '@trpc/server';
import { getKid } from '../utils/jwt.utils';


export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1]
    const kid = getKid(token)
    const scopes: string[] = []

    return {token, kid, scopes}
  }
  return {}
};

export const appRouter = router({
  todo: todoRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type Context = inferAsyncReturnType<typeof createContext>;