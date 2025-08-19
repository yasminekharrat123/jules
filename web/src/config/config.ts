import z from "zod"

const configSchema = z.object({
  api: z.object({
    url: z.string(),
  }),
  time: z.object({
    errorMessageDurationInSeconds: z.number(),
  }),
})
const webConfig = ((): z.infer<typeof configSchema> => {
  try {
    return configSchema.parse({
      api: {
        url: process.env.NEXT_PUBLIC_API__URL,
      },
      time: {
        errorMessageDurationInSeconds: 5,
      },
    })
  } catch (error) {
    throw new Error("Failed to load config", { cause: error })
  }
})()

export default webConfig
