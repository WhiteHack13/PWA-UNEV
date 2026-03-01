import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";
import { useQuiz } from "../context/QuizContext";
import { saveResult, getResultsForUser } from "../services/resultsService";
import { formatDateTime } from "../utils/format";
import { useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Results() {
  const { user } = useAuth();
  const { session, reset } = useQuiz();
  const [params] = useSearchParams();
  const fromQuiz = params.get("from") === "quiz";
  const total = session.questions.length || 15;
  const correct = session.score || 0;
  const incorrect = Math.max(0, total - correct);
  const [history, setHistory] = useState([]);
  const savedRef = useRef(false);

  useEffect(() => {
    if (!user) return;
    if (!savedRef.current && fromQuiz && session.category && session.questions.length) {
      saveResult({
        userEmail: user.email,
        userName: user.name || user.email,
        category: session.category,
        score: correct,
        total,
        breakdown: { correct, incorrect }
      });
      savedRef.current = true;
    }
    setHistory(getResultsForUser(user.email));
  }, [user?.email]);

  const doughnutData = useMemo(() => ({
    labels: ["Correctas", "Incorrectas"],
    datasets: [{
      label: "Resultado",
      data: [correct, incorrect],
      backgroundColor: [
        "#16a34a",
        "#dc2626"
      ],
      borderColor: [
        "#15803d",
        "#b91c1c"
      ],
      borderWidth: 2
    }]
  }), [correct, incorrect]);

  const barData = useMemo(() => {
    const last10 = history.slice(0, 10).reverse();
    return {
      labels: last10.map(r =>
        r.category.length > 10
          ? r.category.slice(0, 10) + "…"
          : r.category
      ),
      datasets: [{
        label: "Puntaje",
        data: last10.map(r => r.score),
        backgroundColor: "#6366f1",
        borderRadius: 8
      }]
    };
  }, [history]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Resultados</h1>
            <p className="mt-1 text-slate-600">
              Tu historial se guarda localmente.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              to="/"
              onClick={() => reset()}
              className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800"
            >
              Jugar de nuevo
            </Link>
            <Link
              to="/"
              className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-900 border border-slate-200 hover:bg-slate-50"
            >
              Categorías
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card>
            <div className="text-lg font-extrabold">Último intento</div>
            <div className="mt-2 text-4xl font-black">{correct}/{total}</div>
            <div className="mt-1 text-sm text-slate-600">
              Categoría: <span className="font-bold text-slate-900">{session.category || "—"}</span>
            </div>

            <div className="mt-5 max-w-sm">
              <Doughnut data={doughnutData} />
            </div>

            <div className="mt-4 text-xs text-slate-500">
              * Si entraste aquí sin jugar, el “último intento” puede estar en blanco.
            </div>
          </Card>

          <Card>
            <div className="text-lg font-extrabold">Historial (últimos 10)</div>
            <div className="mt-4">
              {history.length ? (
                <Bar data={barData} />
              ) : (
                <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                  Aún no hay intentos guardados. Ve a jugar
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <div className="flex items-center justify-between gap-2">
              <div className="text-lg font-extrabold">Lista de intentos</div>
              <button
                onClick={() => { 
                  localStorage.removeItem("aqp_results");
                  setHistory([]);
                }}
                className="rounded-2xl bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700 hover:bg-rose-100"
              >
                Borrar historial
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-3 py-2 text-left">Fecha</th>
                    <th className="px-3 py-2 text-left">Categoría</th>
                    <th className="px-3 py-2 text-left">Puntaje</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length ? history.map(r => (
                    <tr key={r.id} className="border-t border-slate-200">
                      <td className="px-3 py-2">{formatDateTime(r.createdAt)}</td>
                      <td className="px-3 py-2 font-semibold">{r.category}</td>
                      <td className="px-3 py-2 font-black">{r.score}/{r.total}</td>
                    </tr>
                  )) : (
                    <tr className="border-t border-slate-200">
                      <td className="px-3 py-4 text-slate-500" colSpan="3">Sin datos</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
