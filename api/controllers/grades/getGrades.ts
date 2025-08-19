import { getUserByID } from "@utils/db"
import { Context } from "hono"
import { db } from "src/db"

interface ContextWithValidations extends Context {
  get(key: "validatedParams"): { id: number }
  get(key: string): unknown
}
const getGrades = async (ctx: ContextWithValidations) => {
  const validated = ctx.get("validatedParams")
  const student = await getUserByID(validated.id)

  if (student.length === 0) {
    return ctx.json({ error: "Student not found" }, 404)
  }

  const grades = await db
    .selectFrom("grades")
    .where("studentId", "=", validated.id)
    .selectAll()
    .execute()

  return ctx.json(grades)
}

export default getGrades
