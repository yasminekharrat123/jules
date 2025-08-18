import { Hono } from "hono"
import { db } from "src/db"

const studentRoutes = new Hono()
  .post("/", (c) => c.text("Post students!"))
  .get("/", async (c) => {
    const students = await db
      .selectFrom("students")
      .where("deleted_at", "is", null)
      .selectAll()
      .execute()

    return c.json(students)
  })

export default studentRoutes
