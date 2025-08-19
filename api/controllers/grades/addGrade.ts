import { getUserByID } from "@utils/db"
import { Context } from "hono"
import { db } from "src/db"

interface ContextWithValidation extends Context {
  get(key: "validatedParams"): { id: number }
  get(key: "validated"): { subject: string; grade: number }
  get(key: string): unknown
}

const addGrade = async (ctx: ContextWithValidation) => {
  const params = ctx.get("validatedParams")
  const gradeData = ctx.get("validated")
  const student = await getUserByID(params.id)

  if (student.length === 0) {
    return ctx.json({ error: "Student not found" }, 404)
  }

  const gradeToInsert = {
    ...gradeData,
    studentId: params.id,
  }

  try {
    await db.insertInto("grades").values(gradeToInsert).execute()
  } catch (error) {
    return ctx.json(
      {
        message:
          "Failed to create grade. Check the student don't already have a grade for this subject",
        error,
      },
      500,
    )
  }

  return ctx.json({ message: "Grade created" })
}

export default addGrade
