import { pool } from "../db/pool.js";

export const tokensRepo = {
  async crear({ sesionId, usuarioId, hashToken, expiraEn }) {
    await pool.query("SELECT crear_token_actualizacion($1,$2,$3,$4)", [sesionId, usuarioId, hashToken, expiraEn]);
  },
  async obtenerValidoPorHash(hashToken) {
    const { rows } = await pool.query("SELECT * FROM obtener_token_por_hash($1)", [hashToken]);
    return rows[0] || null;
  },
  async revocarPorId(id) {
    await pool.query("SELECT revocar_token($1)", [id]);
  },
  async marcarRotacion({ tokenAnteriorId, tokenNuevoId }) {
    await pool.query("UPDATE tokens_actualizacion SET rotado_en=NOW(), reemplazado_por_token_id=$2 WHERE id=$1", [tokenAnteriorId, tokenNuevoId]);
  }
};
