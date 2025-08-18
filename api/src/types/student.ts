import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely"

export interface StudentTable {
  id: Generated<number>
  firstName: string
  lastName: string
  age: number
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
  deleted_at: ColumnType<Date, string | undefined, never>
}

export type Student = Selectable<StudentTable>

export type NewStudent = Insertable<StudentTable>

export type StudentUpdate = Updateable<StudentTable>
