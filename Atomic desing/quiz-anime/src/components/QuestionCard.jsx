import Card from "./Card";

export default function QuestionCard({ q, index, total, selected, onSelect }) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-slate-500">Pregunta {index + 1} de {total}</div>
        <div className="text-xs rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-600">{q.category}</div>
      </div>

      <div className="mt-3 text-xl font-extrabold tracking-tight">{q.question}</div>

      <div className="mt-4 grid gap-2">
        {q.options.map((opt, i) => {
          const active = selected === i;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={
                "rounded-2xl border px-4 py-3 text-left font-semibold transition " +
                (active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white hover:bg-slate-50")
              }
            >
              <span className="mr-2 inline-grid h-6 w-6 place-items-center rounded-lg bg-black/5 text-xs font-black">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
