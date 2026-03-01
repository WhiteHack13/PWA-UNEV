export default function Card({ children, className = "" }) {
  return (
    <div className={"rounded-3xl border border-slate-200 bg-white p-5 shadow-soft " + className}>
      {children}
    </div>
  );
}
