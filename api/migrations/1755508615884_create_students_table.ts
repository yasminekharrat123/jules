import { sql, type Kysely } from "kysely"
import type { Database } from "../src/types/db"

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export const up = async (db: Kysely<Database>): Promise<void> => {
  await db.schema
    .createTable("students")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("firstName", "varchar", (col) => col.notNull())
    .addColumn("lastName", "varchar", (col) => col.notNull())
    .addColumn("age", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("deleted_at", "timestamp")
    .execute()
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export const down = async (db: Kysely<Database>): Promise<void> => {
  await db.schema.dropTable("students").execute()
}
