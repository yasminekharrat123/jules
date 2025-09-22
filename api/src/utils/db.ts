import { db } from "../db"

export const getAllStudents = (page: number) =>
  db
    .selectFrom("students")
    .where("deleted_at", "is", null)
    .select(["id", "firstName", "lastName", "age"])
    .orderBy("id", "desc")
    .limit(10)
    .offset((page - 1) * 10)
    .execute()

export const getUserByID = (id: number) =>
  db
    .selectFrom("students")
    .where("id", "=", id)
    .where("deleted_at", "is", null)
    .select(["id", "firstName", "lastName", "age"])
    .execute()

export const getStudentWithGrades = async (id: number) => {
  const student = await db
    .selectFrom("students")
    .where("students.id", "=", id)
    .where("students.deleted_at", "is", null)
    .select(["id", "firstName", "lastName", "age"])
    .execute()

  if (!student.length) {
    return null
  }

  const grades = await db
    .selectFrom("grades")
    .where("studentId", "=", id)
    .where("deleted_at", "is", null)
    .select(["id", "subject", "grade"])
    .execute()

  return {
    ...student[0],
    grades,
  }
}
