// import { inferAsyncReturnType, initTRPC } from '@trpc/server';
// import { createExpressMiddleware } from "@trpc/server/adapters/express"
// import express from "express";
// import { appRouter } from './routes';
// import { generateOpenApiDocument } from 'trpc-openapi';
// import { createOpenApiExpressMiddleware } from 'trpc-openapi';
// import swaggerUi from "swagger-ui-express"
// // import openAPISpec  from './OpenapiSpec.json'
// // import { todosRouter } from "./routes/todos";
// // import { authRouter } from "./routes/auth";

// export const PORT = process.env.PORT || 5001;
// export const openApiDocument = generateOpenApiDocument(appRouter, {
//   title: 'tRPC OpenAPI',
//   version: '1.0.0',
//   baseUrl: `http://localhost:${PORT}`,
// });

// const app = express();

// app.use('/api', createOpenApiExpressMiddleware({ router: appRouter }));

// app.use(
//   "/",
//   createExpressMiddleware({
//     router: appRouter,
//     createContext: ({ req, res }) => {
//       return {}
//     },
//   })
// )

// app.use('/', swaggerUi.serve);
// app.get('/', swaggerUi.setup(openApiDocument));

// // app.use(express.json());
// // app.use('/todos', todosRouter);
// // app.use('/auth', authRouter);

// // // Swagger
// // app.use('/doc', swaggerUi.serve, swaggerUi.setup(openAPISpec))

// // Start the Express app
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // const t = true
// // app.get("/todos/:id", (req, res) => {
//   // console.log(req.query?.hi)
// //   console.log("wopwop")
// //   if(t) return res.status(200).json(["Tony","Lisa","Michael","Ginger","Food"]);
// //   res.status(404)
// //  });

// //  app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// //  });

/* eslint-disable @typescript-eslint/no-misused-promises */
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { createOpenApiExpressMiddleware } from "trpc-openapi";

import { openApiDocument } from "./openapi";
import { appRouter, createContext } from "./routes";
import { PORT } from "./environment/environment";
import { auth } from "express-oauth2-jwt-bearer";

const app = express();
const checkJwt = auth({
  audience: "https://example-api.devdev.no/",
  issuerBaseURL: `https://example-api.eu.auth0.com/`,
});
// Setup CORS

// Handle incoming tRPC requests
app.use(
  "/api/trpc",
  checkJwt,
  createExpressMiddleware({ router: appRouter, createContext })
);

// Handle incoming OpenAPI requests
app.use(
  "/api",
  createOpenApiExpressMiddleware({ router: appRouter, createContext })
);

//checkJWT middleware
// app.use('/api', checkJwt, createOpenApiExpressMiddleware({ router: appRouter, createContext }));

// Serve Swagger UI with our OpenAPI schema
app.use("/", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const test = appRouter
//   .createCaller({
//     scopes: [],
//     token:
//       "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InZCRzdfdFIxYTRQWGtCMl9WUDNxayJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUtYXBpLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJxeFhEbmIwekR3WFI3OXNWVTQzZ3hLdXpCQUxHVGxIUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9leGFtcGxlLWFwaS5kZXZkZXYubm8vIiwiaWF0IjoxNjgyNDMyNjM0LCJleHAiOjE2ODI1MTkwMzQsImF6cCI6InF4WERuYjB6RHdYUjc5c1ZVNDNneEt1ekJBTEdUbEhQIiwic2NvcGUiOiJyZWFkOnRvZG9zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.B5qHtdViArTNUAMhEubrTqljY4txXpJRHn-dOEjmgnd0O_3tzovluC8lx6QoLmsj2dpBUUua4SBCyhJ6ax7GQXNP-ymF1ZiY1JieegTXxmy4BW4SKpFSYYWSvrzwFz9TjlSU8uh4bcmkBc8Y1jDY--4YZln-FJD0b0elzfwCHAdEoX9Mx2Uqbm2HZK5JBrSGbfJTxJnBzjYPf5u-bMYiM34_JoE3ZUaFfWASlNpAGDRJpPl6evl207yOPnqCs04LoHKZtWBsvT8Qzuf-jlexDHHy-Em-IcoBnlsODmhBMoEbuEjo9x5yC5mk8TW5vPE9O64avrwMdWOUFyPerRTb1A",
//     kid: "vBG7_tR1a4PXkB2_VP3qk",
//   })
//   .todo.getTodos();

// (async() => {
//   console.log(await test)
// })()
