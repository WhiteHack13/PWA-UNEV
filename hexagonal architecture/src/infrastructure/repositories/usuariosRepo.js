import { query } from "../db/pool.js";

export const usuariosRepo = {

  async crearLocal({ nombre, correo, contrasenaHash }) {

    const { rows } = await query(
      "SELECT crear_usuario($1,$2,$3) AS result",
      [nombre, correo, contrasenaHash]
    );

    const result = rows[0].result;

    if (!result.success) {
      throw new Error(result.error);
    }

    return result.usuario;
  },

  async obtenerPorCorreo(correo) {
    const { rows } = await query(
      "SELECT * FROM obtener_usuario_por_correo($1)",
      [correo]
    );
    return rows[0] || null;
  },

  async obtenerPorId(id) {
    const { rows } = await query(
      "SELECT id, nombre, correo FROM usuarios WHERE id = $1",
      [id]
    );
    return rows[0] || null;
  }

};