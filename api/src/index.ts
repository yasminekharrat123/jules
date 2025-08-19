import apiConfig from "@config/config"
import { serve } from "@hono/node-server"
import gradesRoutes from "@routes/grades/routes"
import studentRoutes from "@routes/students/routes"
import { Hono } from "hono"
import { cors } from "hono/cors"

const app = new Hono()

app.use(
  "/*",
  cors({
    origin: apiConfig.api.cors.origin,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
)

app.route("/students", studentRoutes)
app.route("/grades", gradesRoutes)

serve({
  fetch: app.fetch,
  port: apiConfig.api.port,
})
