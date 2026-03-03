import { pool } from "../db/pool.js";

export const intentosRepo = {
  async crear({ usuarioId, categoriaId, total }) {
    const { rows } = await pool.query("SELECT * FROM crear_intento($1,$2,$3)", [usuarioId, categoriaId, total]);
    return rows[0]?.id || null;
  },
  async actualizarResultado({ intentoId, correctas, puntaje }) {
    await pool.query("SELECT actualizar_resultado_intento($1,$2,$3)", [intentoId, correctas, puntaje]);
  },
  async historial({ usuarioId }) {
    const { rows } = await pool.query("SELECT * FROM obtener_historial_usuario($1)", [usuarioId]);
    return rows;
  }
};
