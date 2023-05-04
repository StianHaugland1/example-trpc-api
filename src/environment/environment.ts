import * as dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const AUTH0_ISSUER_BASE_URL =
  process.env.AUTH0_ISSUER_BASE_URL || "https://example-api.eu.auth0.com";
export const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

if (!AUTH0_ISSUER_BASE_URL) {
  console.error("AUTH0_ISSUER_BASE_URL is missing");
  process.exit(1);
}
