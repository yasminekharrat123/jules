import { faker } from "@faker-js/faker"
import type { Kysely } from "kysely"

import { Database } from "../src/types/db"
import { seedUsers } from "./1755509905947_create_students"

const SUBJECTS = [
  "Math",
  "Science",
  "History",
  "English",
  "Art",
  "Music",
  "Physical Education",
  "Computer Science",
  "Foreign Language",
  "Social Studies",
]

export const seed = async (db: Kysely<Database>) => {
  await db.deleteFrom("grades").execute()

  const gradePromises = seedUsers.flatMap((student) =>
    SUBJECTS.map((subject) =>
      db
        .insertInto("grades")
        .values({
          studentId: student.id ?? 1,
          subject,
          grade: faker.number.int({ min: 1, max: 20 }),
        })
        .execute(),
    ),
  )

  await Promise.all(gradePromises)
}
