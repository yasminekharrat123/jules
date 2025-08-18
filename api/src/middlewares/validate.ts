import { Context } from "hono"
import z from "zod"

export const validateBody =
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

export const validateParams =
  (schema: z.ZodType) => async (ctx: Context, next: () => Promise<unknown>) => {
    const params = ctx.req.param()
    const result = schema.safeParse(params)

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

    ctx.set("validatedParams", result.data)

    return await next()
  }

export const validateQuery =
  (schema: z.ZodType) => async (ctx: Context, next: () => Promise<unknown>) => {
    const query = ctx.req.query()
    const result = schema.safeParse(query)

    if (!result.success) {
      return ctx.json(
        { error: "Validation failed", details: result.error.issues },
        400,
      )
    }

    ctx.set("validatedQuery", result.data)

    return await next()
  }
