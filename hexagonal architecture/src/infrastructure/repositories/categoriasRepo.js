import { pool } from "../db/pool.js";

export const categoriasRepo = {
  async listar() {
    const { rows } = await pool.query("SELECT * FROM listar_categorias()");
    return rows;
  },
  async obtenerPorSlug(slug) {
    const { rows } = await pool.query("SELECT * FROM categorias WHERE slug=$1", [slug]);
    return rows[0] || null;
  }
};
