import { pool } from "../db/pool.js";

export const respuestasRepo = {
  async guardar({ intentoId, preguntaId, indiceElegido, indiceCorrecto, esCorrecta }) {
    await pool.query("SELECT guardar_respuesta_intento($1,$2,$3,$4,$5)", [intentoId, preguntaId, indiceElegido, indiceCorrecto, esCorrecta]);
  }
};
