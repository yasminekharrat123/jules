import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely"

export interface GradeTable {
  id: Generated<number>
  studentId: number
  subject: string
  grade: number
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
  deleted_at: ColumnType<Date, string | undefined, never>
}

export type Grade = Selectable<GradeTable>

export type NewGrade = Insertable<GradeTable>

export type GradeUpdate = Updateable<GradeTable>
