import type { GradeTable } from "./grade"
import type { StudentTable } from "./student"

export interface Database {
  students: StudentTable
  grades: GradeTable
}
