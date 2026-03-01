import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import QuestionCard from "../components/QuestionCard";
import Card from "../components/Card";
import Toast from "../components/Toast";
import { getRandomQuestionsByCategory } from "../services/questionsService";
import { useQuiz } from "../context/QuizContext";

export default function Quiz() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category || "Mix");
  const nav = useNavigate();
  const { session, start, answer, reset } = useQuiz();

  const questions = useMemo(() => getRandomQuestionsByCategory(decodedCategory, 15), [decodedCategory]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "info" });

  const show = (message, type="info") => {
    setToast({ message, type });
    window.clearTimeout(window.__aqp_toast);
    window.__aqp_toast = window.setTimeout(() => setToast({ message: "", type: "info" }), 2000);
  };

  useEffect(() => {
    start({ category: decodedCategory, questions });
    setIdx(0);
    setSelected(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedCategory]);

  const q = questions[idx];

  const onNext = () => {
    if (selected === null) {
      show("Selecciona una opción", "error");
      return;
    }
    answer({ qid: q.id, chosenIndex: selected, correctIndex: q.correctIndex });

    const last = idx === questions.length - 1;
    setSelected(null);

    if (last) {
      nav("/results?from=quiz");
    } else {
      setIdx(i => i + 1);
    }
  };

  const progress = Math.round(((idx) / questions.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Quiz: {decodedCategory}</h1>
            <div className="text-sm text-slate-600">Responde y avanza. No hay “volver” (modo examen).</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { reset(); nav("/"); }}
              className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-200"
            >
              Salir
            </button>
            <button
              onClick={() => { start({ category: decodedCategory, questions }); setIdx(0); setSelected(null); show("Nuevo set aleatorio", "success"); }}
              className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-900 border border-slate-200 hover:bg-slate-50"
            >
              Re-barajar
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="h-2 w-full rounded-full bg-slate-200">
            <div className="h-2 rounded-full bg-slate-900" style={{ width: `${Math.max(progress, 2)}%` }} />
          </div>
          <div className="mt-2 text-xs text-slate-500">Progreso: {idx}/{questions.length}</div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr,320px]">
          <div>
            <QuestionCard
              q={q}
              index={idx}
              total={questions.length}
              selected={selected}
              onSelect={(i) => setSelected(i)}
            />

            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                onClick={onNext}
                className="rounded-2xl bg-slate-900 px-6 py-3 font-extrabold text-white hover:bg-slate-800"
              >
                {idx === questions.length - 1 ? "Finalizar" : "Siguiente"}
              </button>
            </div>
          </div>

          <Card className="h-fit">
            <div className="text-lg font-extrabold">Live score</div>
            <div className="mt-2 text-sm text-slate-600">
              Correctas: <span className="font-bold text-slate-900">{session.score}</span>
            </div>
            <div className="mt-4 text-xs text-slate-500">
              * El puntaje se calcula solo cuando confirmas “Siguiente”.
            </div>
          </Card>
        </div>
      </main>

      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}
