import { Context } from "hono"
import { db } from "../../src/db"
import { NewStudent } from "../../src/types/student"

interface ContextWithValidation extends Context {
  get(key: "validated"): NewStudent
  get(key: string): unknown
}

const addStudent = async (ctx: ContextWithValidation) => {
  const validated = ctx.get("validated")

  await db.insertInto("students").values(validated).execute()

  return ctx.json({ message: "Student created" })
}

export default addStudent
