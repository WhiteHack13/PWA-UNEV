import { pool } from "../db/pool.js";

export const preguntasRepo = {
  async aleatoriasPorSlug({ slug, limite }) {
    const { rows } = await pool.query("SELECT * FROM obtener_preguntas_aleatorias($1,$2)", [slug, limite]);
    return rows;
  },
  async obtenerIndiceCorrecto(preguntaId) {
    const { rows } = await pool.query("SELECT indice_correcto FROM preguntas WHERE id=$1", [preguntaId]);
    return rows[0]?.indice_correcto ?? null;
  }
};
