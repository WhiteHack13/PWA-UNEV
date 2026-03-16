import { pool } from "../src/infrastructure/db/pool.js"

afterAll(async () => {
    await pool.end()
})