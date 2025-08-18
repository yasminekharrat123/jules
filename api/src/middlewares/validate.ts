import { Context } from "hono"
import z from "zod"

const validate =
  (schema: z.ZodType) => async (ctx: Context, next: () => Promise<unknown>) => {
    try {
      const body = (await ctx.req.json()) as z.infer<typeof schema>
      const result = schema.safeParse(body)

      if (!result.success) {
        const formattedErrors = result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }))

        return ctx.json(
          {
            error: "Validation failed",
            details: formattedErrors,
          },
          400,
        )
      }

      ctx.set("validated", result.data)

      return await next()
    } catch {
      return ctx.json({ error: "Invalid JSON" }, 400)
    }
  }

export default validate
