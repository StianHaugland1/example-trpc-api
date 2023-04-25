import { generateOpenApiDocument } from 'trpc-openapi';

import { appRouter } from './routes';
import { PORT } from './environment/environment';

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Example CRUD API',
  description: 'OpenAPI compliant REST API built using tRPC with Express',
  version: '1.0.0',
  baseUrl: `http://localhost:${PORT}/api`,
  docsUrl: 'https://github.com/jlalmes/trpc-openapi',
});