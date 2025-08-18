import { faker } from "@faker-js/faker"
import type { Kysely } from "kysely"
import type { Database } from "src/types/db"
import apiConfig from "../src/config/config"
import type { NewStudent } from "../src/types/student"

const seedStudent = (): NewStudent => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int({ min: 18, max: 60 }),
})

export const seed = async (db: Kysely<Database>): Promise<void> => {
  await db
    .insertInto("students")
    .values(
      Array.from({ length: apiConfig.seed.users.count }, () => seedStudent()),
    )
    .execute()
}
