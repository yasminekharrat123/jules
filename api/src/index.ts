import apiConfig from "@config/config"
import { serve } from "@hono/node-server"
import gradesRoutes from "@routes/grades/routes"
import studentRoutes from "@routes/students/routes"
import { Hono } from "hono"

const app = new Hono()

app.route("/students", studentRoutes)
app.route("/grades", gradesRoutes)

serve({
  fetch: app.fetch,
  port: apiConfig.api.port,
})
