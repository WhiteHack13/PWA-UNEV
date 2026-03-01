import Card from "./Card";

export default function CategoryCard({ title, subtitle, onClick }) {
  return (
    <button onClick={onClick} className="text-left w-full">
      <Card className="transition hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-extrabold tracking-tight">{title}</div>
            <div className="mt-1 text-sm text-slate-600">{subtitle}</div>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white grid place-items-center font-black">
            ▶
          </div>
        </div>
      </Card>
    </button>
  );
}
