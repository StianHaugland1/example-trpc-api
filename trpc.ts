import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";
import * as trpcExpress from '@trpc/server/adapters/express';
import { getKid } from "./utils/jwt.utils";

export const createContext = ({
  req,
  // res,
}: trpcExpress.CreateExpressContextOptions) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1]
    const kid = getKid(token)
    const scopes: string[] = []

    return {token, kid, scopes}
  }
  return {}
};

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.meta<OpenApiMeta>().context<Context>().create();

export const router = t.router;
