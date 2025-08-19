import { getAllStudents } from "@utils/db"
import { Context } from "hono"

interface ContextWithValidation extends Context {
  get(key: "validatedQuery"): { page: number }
  get(key: string): unknown
}

const getAllStudentsController = async (ctx: ContextWithValidation) => {
  const validated = ctx.get("validatedQuery")
  const students = await getAllStudents(validated.page || 1)

  return ctx.json(students)
}

export default getAllStudentsController
