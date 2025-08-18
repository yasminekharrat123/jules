import { z } from "zod"

export const portValidator = z
  .number("Port must be a number")
  .min(1, "Port must be greater than 0")
  .max(65535, "Maximal value for port is 65535")

export const uriValidator = z
  .string()
  .min(10, "URI is too short (min 10 characters)")

export const nameValidator = z.string().min(1, "A name can't be empty")

export const ageValidator = z.number().min(1, "Age must be greater than 0")

export const studentValidator = z.object({
  firstName: nameValidator,
  lastName: nameValidator,
  age: ageValidator,
})

export const IdValidator = z.coerce.number().min(1, "Id must be greater than 0")

export const subjectValidator = z.string().min(1, "A subject can't be empty")

export const pageValidator = z.coerce
  .number()
  .min(1, "Page must be greater than 0")

export const gradeValidator = z.coerce
  .number()
  .min(1, "Grade must be greater than 0")
  .max(20, "Grade must be less than 20")

export const createGradeValidator = z.object({
  subject: subjectValidator,
  grade: gradeValidator,
})
