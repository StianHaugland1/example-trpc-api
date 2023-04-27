import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import { serve, setup } from "swagger-ui-express";
import { createOpenApiExpressMiddleware } from "trpc-openapi";

import { openApiDocument } from "./openapi";
import { appRouter } from "./routes/appRouter";
import { PORT } from "./environment/environment";
import { createContext } from "./trpc";

const app = express();

// Setup CORS

// Handle incoming tRPC requests
app.use(
  "/api/trpc",
  createExpressMiddleware({ router: appRouter, createContext }),
);

// Handle incoming OpenAPI requests
app.use(
  "/api",
  createOpenApiExpressMiddleware({ router: appRouter, createContext }),
);

// Openapi spec
app.get("/openapi", (_req, res) => {
  res.json(openApiDocument);
});

// Serve Swagger UI with our OpenAPI schema
app.use("/", serve, setup(openApiDocument));

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});

// const test = appRouter
//   .createCaller({
//     scopes: [],
//     token:
//       "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InZCRzdfdFIxYTRQWGtCMl9WUDNxayJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUtYXBpLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJxeFhEbmIwekR3WFI3OXNWVTQzZ3hLdXpCQUxHVGxIUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9leGFtcGxlLWFwaS5kZXZkZXYubm8vIiwiaWF0IjoxNjgyNDMyNjM0LCJleHAiOjE2ODI1MTkwMzQsImF6cCI6InF4WERuYjB6RHdYUjc5c1ZVNDNneEt1ekJBTEdUbEhQIiwic2NvcGUiOiJyZWFkOnRvZG9zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.B5qHtdViArTNUAMhEubrTqljY4txXpJRHn-dOEjmgnd0O_3tzovluC8lx6QoLmsj2dpBUUua4SBCyhJ6ax7GQXNP-ymF1ZiY1JieegTXxmy4BW4SKpFSYYWSvrzwFz9TjlSU8uh4bcmkBc8Y1jDY--4YZln-FJD0b0elzfwCHAdEoX9Mx2Uqbm2HZK5JBrSGbfJTxJnBzjYPf5u-bMYiM34_JoE3ZUaFfWASlNpAGDRJpPl6evl207yOPnqCs04LoHKZtWBsvT8Qzuf-jlexDHHy-Em-IcoBnlsODmhBMoEbuEjo9x5yC5mk8TW5vPE9O64avrwMdWOUFyPerRTb1A",
//     kid: "vBG7_tR1a4PXkB2_VP3qk",
//   })
//   .todo.getTodo({id:1});

// (async() => {
//   console.log(await test)
// })()
