import { pool } from "../db/pool.js";

export const usuariosRepo = {
  async crearLocal({ nombre, correo, contrasenaHash }) {
    const { rows } = await pool.query("SELECT * FROM crear_usuario($1,$2,$3)", [nombre, correo, contrasenaHash]);
    return rows[0] || null;
  },
  async obtenerPorCorreo(correo) {
    const { rows } = await pool.query("SELECT * FROM obtener_usuario_por_correo($1)", [correo]);
    return rows[0] || null;
  },
  async obtenerPorId(id) {
    const { rows } = await pool.query("SELECT * FROM usuarios WHERE id=$1", [id]);
    return rows[0] || null;
  },
  async crearOAuth({ nombre, correo, correoProveedor, urlAvatar, correoVerificadoEn }) {
    const q = `INSERT INTO usuarios (nombre, correo, proveedor, proveedor_id, correo_proveedor, url_avatar, correo_verificado_en)
               VALUES ($1,$2,NULL,NULL,$3,$4,$5) RETURNING *`;
    const { rows } = await pool.query(q, [nombre, correo, correoProveedor, urlAvatar, correoVerificadoEn]);
    return rows[0] || null;
  }
};
