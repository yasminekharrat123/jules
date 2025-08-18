import { getAllStudents, getStudentWithGrades } from "@utils/db"
import { Context, Hono } from "hono"
import { db } from "src/db"
import {
  validateBody,
  validateParams,
  validateQuery,
} from "src/middlewares/validate"
import type { NewStudent } from "src/types/student"
import {
  IdValidator,
  pageValidator,
  studentValidator,
} from "src/utils/validators"
import z from "zod"

interface ValidatedBodyContext extends Context {
  get(key: "validated"): NewStudent
  get(key: string): unknown
}

interface ValidatedParamsContext extends Context {
  get(key: "validatedParams"): { id: number }
  get(key: string): unknown
}

interface ValidatedQueryContext extends Context {
  get(key: "validatedQuery"): { page: number }
  get(key: string): unknown
}

const studentRoutes = new Hono()
  .post(
    "/",
    validateBody(studentValidator),
    async (ctx: ValidatedBodyContext) => {
      const validated = ctx.get("validated")

      await db.insertInto("students").values(validated).execute()

      return ctx.json({ message: "Student created" })
    },
  )
  .get(
    "/:id/",
    validateParams(
      z.object({
        id: IdValidator,
      }),
    ),
    async (ctx: ValidatedParamsContext) => {
      const validated = ctx.get("validatedParams")
      const student = await getStudentWithGrades(validated.id)

      if (!student) {
        return ctx.json({ error: "Student not found" }, 404)
      }

      return ctx.json(student)
    },
  )
  .get(
    "/",
    validateQuery(
      z.object({
        page: pageValidator,
      }),
    ),
    async (ctx: ValidatedQueryContext) => {
      const validated = ctx.get("validatedQuery")
      const students = await getAllStudents(validated.page)

      return ctx.json(students)
    },
  )

export default studentRoutes
