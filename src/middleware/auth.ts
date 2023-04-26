import { t } from "../trpc";
import jwksClient from "jwks-rsa";
import { verify } from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import { AUTH0_ISSUER_BASE_URL } from "../environment/environment";

const client = jwksClient({
  jwksUri: `${AUTH0_ISSUER_BASE_URL}https://example-api.eu.auth0.com/.well-known/jwks.json`,
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
    const decodedToken = verify(ctx.token, signingKey);
    if (typeof decodedToken === "string") return next();
    const scopes = decodedToken?.scope?.split(" ");

    return next({
      ctx: {
        ...ctx,
        scopes: scopes || [],
      },
    });
  } catch (error) {
    console.log(error);
    throw new TRPCError({ code: "UNAUTHORIZED", message: `Invalid token` });
  }
});

const validateScopes = (requiredScopes: string[]) => {
  return t.middleware(async ({ next, ctx }) => {
    const hasValidScopes = requiredScopes.every(scope =>
      ctx.scopes?.includes(scope),
    );
    if (!hasValidScopes)
      throw new TRPCError({ code: "UNAUTHORIZED", message: `Invalid scope` });
    ctx.scopes;
    return next();
  });
};

export const validTokenAndScopeProcedure = (requiredScopes: string[]) => {
  //@ts-expect-error temp type error in the trpc library
  const middleware = isAuthed.unstable_pipe(validateScopes(requiredScopes));
  return t.procedure.use(middleware);
};

// export const validTokenProcedure = t.procedure.use(isAuthed)
