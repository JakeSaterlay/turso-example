import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config({ path: ".env" });

export default defineConfig({
  schema: "server/db/schema.ts",
  out: "server/db/migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
