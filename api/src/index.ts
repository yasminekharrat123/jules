import apiConfig from "@config/config"
import { serve } from "@hono/node-server"
import studentRoutes from "@routes/users/routes"
import { Hono } from "hono"

const app = new Hono()

app.route("/students/", studentRoutes)

serve({
  fetch: app.fetch,
  port: apiConfig.api.port,
})
