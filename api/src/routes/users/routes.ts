import { Context, Hono } from "hono"
import { db } from "src/db"
import validate from "src/middlewares/validate"
import type { NewStudent } from "src/types/student"
import { studentValidator } from "src/utils/validators"

interface ValidatedStudentContext extends Context {
  get(key: "validated"): NewStudent
  get(key: string): unknown
}

const studentRoutes = new Hono()
  .post(
    "/",
    validate(studentValidator),
    async (ctx: ValidatedStudentContext) => {
      const validated = ctx.get("validated")

      await db.insertInto("students").values(validated).execute()

      return ctx.json({ message: "Student created" })
    },
  )
  .get("/", async (ctx) => {
    const students = await db
      .selectFrom("students")
      .where("deleted_at", "is", null)
      .selectAll()
      .execute()

    return ctx.json(students)
  })

export default studentRoutes
