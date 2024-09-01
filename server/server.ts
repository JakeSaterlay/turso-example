import express, { Request, Response } from "express";
import path from "path";
import { createClient } from "@libsql/client";
import cors from "cors";
require("dotenv").config();

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// An API endpoint that returns some data
app.get("/api/data", async (req: Request, res: Response) => {
  const data = await turso.execute("SELECT * FROM users");
  console.log("DATA", data.rows);
  res.json({ data: data.rows });
});

// Handles any requests that don't match the API routes
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
