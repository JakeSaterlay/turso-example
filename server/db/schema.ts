import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
});

export const postsTable = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
