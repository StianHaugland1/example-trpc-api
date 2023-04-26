import * as dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5001;

export const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;

if (!AUTH0_ISSUER_BASE_URL) {
  console.error("AUTH0_ISSUER_BASE_URL is missing");
  process.exit(1);
}
