import { initTRPC } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";
import type { Context } from "./routes/";

// export const t = initTRPC.create();
export const t = initTRPC.meta<OpenApiMeta>().context<Context>().create();
export const router = t.router;
