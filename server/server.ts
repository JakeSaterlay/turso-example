import express, { Request, Response } from "express";
import path from "path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import cors from "cors";
import { usersTable } from "./db/schema";
require("dotenv").config();

export const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const db = drizzle(client);
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// An API endpoint that returns some data
app.get("/api/data", async (req: Request, res: Response) => {
  const data = await db.select().from(usersTable).all();
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
