import { sql, type Kysely } from "kysely"
import type { Database } from "src/types/db"

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("grades")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("studentId", "integer", (col) =>
      col.references("students.id").onDelete("cascade").notNull(),
    )
    .addColumn("subject", "varchar", (col) => col.notNull())
    .addColumn("grade", "integer", (col) =>
      col.notNull().check(sql`grade >= 1 AND grade <= 20`),
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("deleted_at", "timestamp")
    .execute()

  // Create unique constraint: one grade per student per subject
  await db.schema
    .createIndex("grades_student_subject_unique")
    .unique()
    .on("grades")
    .columns(["studentId", "subject"])
    .execute()

  await db.schema
    .createIndex("grades_student_id_index")
    .on("grades")
    .column("studentId")
    .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropIndex("grades_student_id_index").execute()
  await db.schema.dropIndex("grades_student_subject_unique").execute()

  await db.schema.dropTable("grades").execute()
}
