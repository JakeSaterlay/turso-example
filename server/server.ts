import express, { Request, Response } from "express";
import path from "path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import cors from "cors";
require("dotenv").config();
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const users = sqliteTable("users", {
  id: text("id"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  textModifiers: text("text_modifiers")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  intModifiers: integer("int_modifiers", { mode: "boolean" })
    .notNull()
    .default(false),
});

export const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const db = drizzle(client);
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// An API endpoint that returns some data
app.get("/api/data", async (req: Request, res: Response) => {
  const data = await db.select().from(users).all();
  console.log("DATA", data);
  res.json({ data: data });
});

// Handles any requests that don't match the API routes
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
