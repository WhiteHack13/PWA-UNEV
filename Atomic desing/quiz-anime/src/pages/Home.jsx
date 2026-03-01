import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategoryCard from "../components/CategoryCard";
import Card from "../components/Card";
import { getCategories } from "../services/questionsService";

export default function Home() {
  const nav = useNavigate();
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Modo examen</h1>
            <p className="mt-1 text-slate-600">
              15 preguntas aleatorias, selección única.
            </p>
          </div>

          <Card className="p-4 bg-white">
            <div className="text-xs text-slate-500">Regla actual</div>
            <div className="text-sm font-bold">15 preguntas por partida</div>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <CategoryCard
            title="Mix (Aleatorio)"
            subtitle="Mezcla de todas las categorías"
            onClick={() => nav("/quiz/Mix")}
          />
          {categories.map((cat) => (
            <CategoryCard
              key={cat}
              title={cat}
              subtitle="Solo preguntas de esta categoría"
              onClick={() => nav(`/quiz/${encodeURIComponent(cat)}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
