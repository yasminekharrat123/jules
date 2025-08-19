import addStudent from "controllers/students/addStudent"
import getAllStudentsController from "controllers/students/getAllStudent"
import getStudentById from "controllers/students/getStudenById"
import { Hono } from "hono"
import {
  validateBody,
  validateParams,
  validateQuery,
} from "src/middlewares/validate"
import {
  IdValidator,
  pageValidator,
  studentValidator,
} from "src/utils/validators"
import z from "zod"

const studentRoutes = new Hono()
  .post("/", validateBody(studentValidator), addStudent)
  .post("", validateBody(studentValidator), addStudent)
  .get(
    "/:id/",
    validateParams(
      z.object({
        id: IdValidator,
      }),
    ),
    getStudentById,
  )
  .get("/:id", validateParams(z.object({ id: IdValidator })), getStudentById)
  .get(
    "/",
    validateQuery(
      z.object({
        page: pageValidator,
      }),
    ),
    getAllStudentsController,
  )
  .get(
    "",
    validateQuery(
      z.object({
        page: pageValidator,
      }),
    ),
    getAllStudentsController,
  )

export default studentRoutes
