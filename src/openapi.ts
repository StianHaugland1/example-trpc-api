import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "./routes/appRouter";
import { BASE_URL, PORT } from "./environment/environment";

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Example CRUD API",
  description: "OpenAPI compliant REST API built using tRPC with Express",
  version: "1.0.0",
  baseUrl: `${BASE_URL}:${PORT}/api`,
  docsUrl: "https://github.com/jlalmes/trpc-openapi",
});
