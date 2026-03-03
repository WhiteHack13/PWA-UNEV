import { pool } from "../db/pool.js";

export const oauthRepo = {
  async obtenerPorProveedor({ proveedor, cuentaProveedorId }) {
    const { rows } = await pool.query("SELECT * FROM obtener_oauth_por_proveedor($1,$2)", [proveedor, cuentaProveedorId]);
    return rows[0] || null;
  },
  async crear({ usuarioId, proveedor, cuentaProveedorId }) {
    await pool.query("SELECT crear_cuenta_oauth($1,$2,$3)", [usuarioId, proveedor, cuentaProveedorId]);
  }
};
