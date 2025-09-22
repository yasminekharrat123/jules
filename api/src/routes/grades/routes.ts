import { createGradeValidator, IdValidator } from "@utils/validators"
import addGrade from "../../../controllers/grades/addGrade"
import getGrades from "../../../controllers/grades/getGrades"
import { Hono } from "hono"
import { validateBody, validateParams } from "../../middlewares/validate"
import z from "zod"

const gradesRoutes = new Hono()
  .post(
    "/student/:id/",
    validateParams(
      z.object({
        id: IdValidator,
      }),
    ),
    validateParams(z.object({ id: IdValidator })),
    validateBody(createGradeValidator),
    addGrade,
    addGrade,
  )
  .post(
    "/student/:id",
    validateParams(z.object({ id: IdValidator })),
    validateBody(createGradeValidator),
    addGrade,
  )
  .get(
    "/student/:id/",
    validateParams(
      z.object({
        id: IdValidator,
      }),
    ),
    getGrades,
  )
  .get("/student/:id", validateParams(z.object({ id: IdValidator })), getGrades)

export default gradesRoutes
