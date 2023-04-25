import { t } from "../trpc";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import { MiddlewareFunction, TRPCError } from "@trpc/server";

const client = jwksClient({
  // TODO ENV VAR
  jwksUri: "https://example-api.eu.auth0.com/.well-known/jwks.json",
});

const isAuthed = t.middleware(async ({ next, ctx }) => {
  if (!ctx.token)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Bearer token missing",
    });

  try {
    const key = await client.getSigningKey(ctx.kid);
    const signingKey = key.getPublicKey();
    const decodedToken = jwt.verify(ctx.token, signingKey);
     if(typeof decodedToken === "string") return next()
     const scopes = decodedToken?.scope?.split(" ")

      return next({
        ctx: {
          ...ctx,
          scopes: scopes || []
        }
      });
  } catch (error) {
    console.log(error);
    throw new TRPCError({ code: "UNAUTHORIZED", message: `Invalid token` });
  }
});

const validateScopes = (requiredScopes: string[]) => {
  return t.middleware(async ({ next, ctx }) => {
    const hasValidScopes = requiredScopes.every(scope => ctx.scopes?.includes(scope))
    if(!hasValidScopes)  throw new TRPCError({ code: "UNAUTHORIZED", message: `Invalid scope` }); 
    ctx.scopes
    return next()
  })
}
export const procedureWithValidTokenAndScopes = (requiredScopes: string[]) => {
  //@ts-expect-error
  const middleware = isAuthed.unstable_pipe(validateScopes(requiredScopes))
  return t.procedure.use(middleware)
}

export const protectedProcedure = t.procedure.use(isAuthed)
