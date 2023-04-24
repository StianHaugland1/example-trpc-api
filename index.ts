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
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createOpenApiExpressMiddleware } from 'trpc-openapi';

import { openApiDocument } from './openapi';
import { appRouter, createContext } from './router';


export const PORT = process.env.PORT || 5001;
const app = express();

// Setup CORS

// Handle incoming tRPC requests
app.use('/api/trpc', createExpressMiddleware({ router: appRouter, createContext }));
// Handle incoming OpenAPI requests
// app.use('/api', createOpenApiExpressMiddleware({ router: appRouter, createContext }));

// Serve Swagger UI with our OpenAPI schema
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(openApiDocument));

 app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
 });