import { getStudentWithGrades } from "@utils/db"
import { Context } from "hono"

interface ContextWithValidation extends Context {
  get(key: "validatedParams"): { id: number }
  get(key: string): unknown
}

const getStudentById = async (ctx: ContextWithValidation) => {
  const validated = ctx.get("validatedParams")
  const student = await getStudentWithGrades(validated.id)

  if (!student) {
    return ctx.json({ error: "Student not found" }, 404)
  }

  return ctx.json(student)
}

export default getStudentById
