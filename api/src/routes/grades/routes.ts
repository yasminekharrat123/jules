import { getUserByID } from "@utils/db"
import { createGradeValidator, IdValidator } from "@utils/validators"
import { Context, Hono } from "hono"
import { db } from "src/db"
import { validateBody, validateParams } from "src/middlewares/validate"
import z from "zod"

interface ValidatedParamsContext extends Context {
  get(key: "validatedParams"): { id: number }
  get(key: string): unknown
}

interface ValidatedBothContext extends Context {
  get(key: "validatedParams"): { id: number }
  get(key: "validated"): { subject: string; grade: number }
  get(key: string): unknown
}

const gradesRoutes = new Hono()
  .post(
    "/student/:id/",
    validateParams(
      z.object({
        id: IdValidator,
      }),
    ),
    validateBody(createGradeValidator),
    async (ctx: ValidatedBothContext) => {
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
    },
  )
  .get(
    "/student/:id",
    validateParams(
      z.object({
        id: IdValidator,
      }),
    ),
    async (ctx: ValidatedParamsContext) => {
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
    },
  )

export default gradesRoutes
