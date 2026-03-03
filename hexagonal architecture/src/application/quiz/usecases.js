import { AppError } from "../../domain/errors.js";

export const buildQuizUsecases = ({ categoriasRepo, preguntasRepo, intentosRepo, respuestasRepo }) => {
  const listarCategorias = async () => categoriasRepo.listar();

  const obtenerPreguntas = async ({ slug, limite }) => {
    if (!slug) throw new AppError("Slug requerido", 400);
    const lim = Math.max(1, Math.min(parseInt(limite || "15", 10), 50));
    return preguntasRepo.aleatoriasPorSlug({ slug, limite: lim });
  };

  const registrarIntento = async ({ usuarioId, categoriaSlug, respuestas }) => {
    const categoria = await categoriasRepo.obtenerPorSlug(categoriaSlug);
    if (!categoria) throw new AppError("Categoría no existe", 404);
    const total = Array.isArray(respuestas) ? respuestas.length : 0;
    if (total <= 0) throw new AppError("Respuestas requeridas", 400);
    const intentoId = await intentosRepo.crear({ usuarioId, categoriaId: categoria.id, total });
    if (!intentoId) throw new AppError("No se pudo crear intento", 500);
    let correctas = 0;
    for (const r of respuestas) {
      const preguntaId = r?.pregunta_id;
      const elegido = r?.indice_elegido;
      if (!preguntaId || typeof elegido !== "number") continue;
      const correcto = await preguntasRepo.obtenerIndiceCorrecto(preguntaId);
      if (correcto === null) continue;
      const esCorrecta = elegido === correcto;
      if (esCorrecta) correctas += 1;
      await respuestasRepo.guardar({ intentoId, preguntaId, indiceElegido: elegido, indiceCorrecto: correcto, esCorrecta });
    }
    const puntaje = Number(((correctas / total) * 100).toFixed(2));
    await intentosRepo.actualizarResultado({ intentoId, correctas, puntaje });
    return { intento_id: intentoId, total_preguntas: total, cantidad_correctas: correctas, puntaje };
  };

  const historial = async ({ usuarioId }) => intentosRepo.historial({ usuarioId });

  return { listarCategorias, obtenerPreguntas, registrarIntento, historial };
};
