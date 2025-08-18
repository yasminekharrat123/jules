import { z } from "zod"

export const portValidator = z
  .number("Port must be a number")
  .min(1, "Port must be greater than 0")
  .max(65535, "Maximal value for port is 65535")

export const uriValidator = z
  .string()
  .min(10, "URI is too short (min 10 characters)")
