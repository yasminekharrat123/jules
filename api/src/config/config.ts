import { config as loadEnv } from "dotenv"
import { z } from "zod"
import { portValidator, uriValidator } from "../utils/validators"

loadEnv()

const configSchema = z.object({
  api: z.object({
    port: portValidator,
    pagination: z.object({
      pageSize: z.number().min(1).max(100),
    }),
  }),
  db: z.object({
    uri: uriValidator,
  }),
  seed: z.object({
    users: z.object({
      count: z.number().min(1).max(1000),
    }),
  }),
})
const apiConfig = ((): z.infer<typeof configSchema> => {
  try {
    return configSchema.parse({
      api: {
        port: Number.parseInt(process.env.API__API_PORT ?? "", 10),
        pagination: {
          pageSize: Number.parseInt(
            process.env.API__PAGINATION__PAGE_SIZE ?? "",
            10,
          ),
        },
      },
      db: {
        uri: process.env.DB__DB_URI,
      },
      seed: {
        users: {
          count: Number.parseInt(process.env.SEED__USERS__COUNT ?? "", 10),
        },
      },
    })
  } catch (error) {
    throw new Error("Failed to load config", { cause: error })
  }
})()

export default apiConfig
