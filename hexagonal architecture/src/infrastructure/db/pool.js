import pg from "pg";
import { config } from "../../config.js";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

pool.on("connect", () => {
  console.log("PostgreSQL conectado");
});

pool.on("error", (err) => {
  console.error("Error inesperado en PostgreSQL", err);
  process.exit(1);
});

export const query = (text, params = []) => {
  return pool.query(text, params);
};