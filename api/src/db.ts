import { Kysely, PostgresDialect } from "kysely"
import { Pool } from "pg"
import apiConfig from "./config/config"
import type { Database } from "./types/db"

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: apiConfig.db.uri,
  }),
})

export const db = new Kysely<Database>({
  dialect,
})
