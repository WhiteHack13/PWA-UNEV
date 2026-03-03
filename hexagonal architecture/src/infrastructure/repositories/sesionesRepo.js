import { pool } from "../db/pool.js";

export const sesionesRepo = {
  async crear({ usuarioId, ip, agenteUsuario }) {
    const { rows } = await pool.query("SELECT * FROM crear_sesion($1,$2,$3)", [usuarioId, ip, agenteUsuario]);
    return rows[0]?.id || null;
  },
  async revocar(sesionId) {
    await pool.query("SELECT revocar_sesion($1)", [sesionId]);
  }
};
